import { Fragment, useState, useRef, useEffect } from 'react';
import { 
  Combobox, 
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Transition 
} from '@headlessui/react';
import { MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/20/solid';
import { 
  UserIcon, 
  ClipboardDocumentListIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { searchService, SearchResult, useSearchShortcut } from '@services/Search.service';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@utils/classNames';
import { useSearchHistoryStore } from '@stores/SearchHistory.store';


// Define a union type for the selectable items
type SelectableItem = SearchResult | SearchHistoryEntry;

// Update the Combobox value type
type ComboboxValue = SelectableItem | null;

// Rest of your type definitions remain the same...
type CategoryType = SearchResult['category'];
type IconMapCategories = Exclude<CategoryType, 'Corporate'>;
type IconMap = {
  [K in IconMapCategories]: typeof UserIcon;
};

const CATEGORY_ICONS: IconMap = {
  missions: DocumentTextIcon,
  customers: UserIcon,
  contacts: UserIcon,
  letterMissions: ClipboardDocumentListIcon,
};

type LabelMap = {
  [K in IconMapCategories]: string;
};

const CATEGORY_LABELS: LabelMap = {
  missions: 'Missions',
  customers: 'Clients',
  contacts: 'Contacts', 
  letterMissions: 'letterMissions'
};

interface SearchOptionProps {
  result: SearchResult;
  active: boolean;
}

interface SearchHistoryEntry {
  id: string;
  query: string;
  timestamp: number;
  category?: CategoryType;
  resultSelected?: string;
}

const isCategoryWithIcon = (category: CategoryType): category is IconMapCategories => {
  return category !== 'Corporate';
}

const SearchHistoryItem: React.FC<{
  entry: SearchHistoryEntry;
  active: boolean;
}> = ({ entry, active }) => {
  const Icon = entry.category && isCategoryWithIcon(entry.category)  ? CATEGORY_ICONS[entry.category] : ClockIcon;
  const formattedDate = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' })
    .format(-Math.floor((Date.now() - entry.timestamp) / 3600000), 'hour');

  return (
    <div className="flex items-center">
      <Icon 
        className={classNames(
          'h-4 w-4 flex-shrink-0 mr-3',
          active ? 'text-white' : 'text-gray-400'
        )}
      />
      <div className="flex-1">
        <div className="font-medium">{entry.query}</div>
        <div className={classNames(
          'text-xs',
          active ? 'text-blue-200' : 'text-gray-500'
        )}>
          {entry.resultSelected && <span className="mr-2">{entry.resultSelected}</span>}
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

interface SearchHistoryListProps {
  filteredHistory: SearchHistoryEntry[];
  onSelect?: (entry: SearchHistoryEntry) => void;
}

const SearchHistoryList: React.FC<SearchHistoryListProps> = ({ 
  filteredHistory,
  onSelect: _onselect
}) => {
  if (!filteredHistory.length) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500">
        Aucun historique trouvé
      </div>
    );
  }

  return (
    <div>
      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
        Historique de recherche
      </div>
      {filteredHistory.map((entry) => (
        <ComboboxOption
          key={entry.id}
          value={entry}
          className={({ active }: { active: boolean }) =>
            classNames(
              'w-full text-left relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-blue-600 text-white' : 'text-gray-900'
            )
          }
        >
          {({ active }: { active: boolean }) => (
            <SearchHistoryItem entry={entry} active={active} />
          )}
        </ComboboxOption>
      ))}
    </div>
  );
};



const SearchOption: React.FC<SearchOptionProps> = ({ result, active }) => {
  const Icon = isCategoryWithIcon(result.category)? CATEGORY_ICONS[result.category]: CATEGORY_ICONS['customers'];
  
  return (
    <div className="flex items-center">
      <Icon 
        className={classNames(
          'h-4 w-4 flex-shrink-0 mr-3',
          active ? 'text-white' : 'text-gray-400'
        )}
        aria-hidden="true" 
      />
      <div>
        <div className="font-medium">{result.title}</div>
        {result.subtitle && (
          <div className={classNames(
            'text-sm',
            active ? 'text-blue-200' : 'text-gray-500'
          )}>
            {result.subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

interface CategoryResultsProps {
  category: CategoryType;
  results: SearchResult[];
}

const CategoryResults: React.FC<CategoryResultsProps> = ({ category, results }) => {
  if (!results?.length) return null;
  
  return (
    <div>
      <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
        {isCategoryWithIcon(category)?CATEGORY_LABELS[category]:CATEGORY_LABELS['customers']}
      </div>
      
      {results.map((result) => (
        <ComboboxOption
          key={result.id}
          value={result}
          className={({ active }: { active: boolean }) =>
            classNames(
              'w-full text-left relative cursor-default select-none py-2 pl-3 pr-9',
              active ? 'bg-blue-600 text-white' : 'text-gray-900'
            )
          }
        >
          {({ active }: { active: boolean }) => <SearchOption result={result} active={active} />}
        </ComboboxOption>
      ))}
    </div>
  );
};

type GroupedResults = {
  missions?: SearchResult[];
  customers?: SearchResult[];
  contacts?: SearchResult[];
  letterMissions?: SearchResult[];
}

interface SearchResultsProps {
  isLoading: boolean;
  query: string;
  groupedResults: GroupedResults;
}

const SearchResults: React.FC<SearchResultsProps> = ({ isLoading, query, groupedResults }) => {
  if (isLoading) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500">
        Recherche en cours...
      </div>
    );
  }

  if (query.length > 0 && 
    !Object.values(groupedResults).some(results => results && results.length > 0)
  ) {
    return (
      <div className="px-4 py-2 text-sm text-gray-500">
        Aucun résultat trouvé.
      </div>
    );
  }

  return (
    <>
      {(Object.entries(groupedResults) as [CategoryType, SearchResult[]][]).map(
        ([category, results]) => (
          <CategoryResults 
            key={category}
            category={category}
            results={results || []}
          />
        )
      )}
    </>
  );
};

const LoadingSpinner = () => (
  <div className="absolute right-3 top-2.5">
    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
  </div>
);

export default function SearchAutocomplete() {
  const [selectedOption, setSelectedOption] = useState<SearchResult | null>(null);
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHistoryMode, setIsHistoryMode] = useState(false);
  const searchHistory = useSearchHistoryStore(state => state.history);
  const addToHistory = useSearchHistoryStore(state => state.addToHistory);
  const navigate = useNavigate();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useSearchShortcut(inputRef);
  const { data, isLoading } = searchService.search(query);
  const groupedResults: GroupedResults = data?.results || {
    missions: [],
    customers: [],
    contacts: [],
    letterMissions: []
  };

  const hasResults = Object.values(groupedResults).some(
    results => results && results.length > 0
  );

  const handleSelect = (selected: ComboboxValue) => {
    if (!selected) return;

    if ('url' in selected) {
      // C'est un SearchResult
      setSelectedOption(selected);
      setQuery('');
      setIsFocused(false);
      // Ajouter à l'historique avant la navigation
      addToHistory(query, selected);
      navigate(selected.url);
    } else {
      // C'est un SearchHistoryEntry
      setQuery(selected.query);
      setIsHistoryMode(false);
    }
  };

  const filteredHistory = searchHistory
    .filter(entry => 
      !query.startsWith('/') || 
      entry.query.toLowerCase().includes(query.slice(1).toLowerCase())
    )
    .sort((a, b) => b.timestamp - a.timestamp);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    setIsHistoryMode(newQuery.startsWith('/'));
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFocused(false);
        setIsHistoryMode(false);
        inputRef.current?.blur();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
        setIsHistoryMode(false);
      }
    };

    if (isFocused) {
      window.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFocused]);

  return (
    <>
      {/* Overlay avec opacité */}
      <Transition
        show={isFocused}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40" />
      </Transition>

      {/* Conteneur principal */}
      <div 
        ref={containerRef}
        className={classNames(
          'transition-all duration-200 ease-in-out',
          isFocused 
            ? 'fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4' 
            : 'relative flex-1'
        )}
      >
         <Combobox<ComboboxValue>
          value={selectedOption}
          onChange={handleSelect}
        >
          <div className="relative">
            <MagnifyingGlassIcon 
              className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-gray-400" 
              aria-hidden="true" 
            />
            <ComboboxInput<SearchResult | SearchHistoryEntry>
              ref={inputRef}
              onFocus={() => setIsFocused(true)}
              className={classNames(
                'w-full border bg-white pl-10 pr-4 text-gray-900 placeholder:text-gray-500 sm:text-sm',
                isFocused 
                  ? 'h-12 rounded-lg shadow-md border-gray-300 focus:border-blue-500 focus:ring-blue-500' 
                  : 'h-10 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                isLoading ? 'pr-10' : ''
              )}
              placeholder="Rechercher... (Ctrl+Espace) ou / pour l'historique"
              onChange={handleQueryChange}
              displayValue={(item) => {
                if (!item) return '';
                if ('url' in item) return item.title;
                return item.query;
              }}
            />
            {isLoading && !isHistoryMode && <LoadingSpinner />}
          </div>

          <Transition
            show={isFocused && (
              (isHistoryMode && query.length > 0) || 
              (!isHistoryMode && query.length >= 2 && hasResults)
            )}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <ComboboxOptions className="absolute w-full overflow-auto overflow-x-hidden rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-64 mt-2">
              {isHistoryMode ? (
                <SearchHistoryList 
                  filteredHistory={filteredHistory}
                  onSelect={handleSelect}
                />
              ) : (
                <SearchResults 
                  isLoading={isLoading}
                  query={query}
                  groupedResults={groupedResults}
                />
              )}
            </ComboboxOptions>
          </Transition>
        </Combobox>
      </div>
    </>
  );
}

