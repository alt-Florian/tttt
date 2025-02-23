import AnimatedLogo from './AnimatedLogo';

interface PageLoaderProps {
  isLoading: boolean;
  message?: string;
}

export default function PageLoader({ 
  isLoading: _isLoading, 
  message = 'Chargement en cours...' 
}: PageLoaderProps) {
  return (
    <div className="relative min-h-screen">
      {/* Content with opacity */}
      <div className="transition-opacity duration-300 opacity-25">
      </div>

      {/* Loader overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
        <div className="w-40 h-40">
          <AnimatedLogo />
        </div>

        {/* Message avec dégradé animé */}
        <div className="mt-6 text-lg font-medium">
          <div
            style={{
              background: 'linear-gradient(90deg, #FBD469 -50%, #FFE9A7 50%, #FBD469 150%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
              animation: 'shimmerText 2s linear infinite'
            }}
          >
            {message}
          </div>
        </div>

        {/* Style pour l'animation du dégradé */}
        <style>
          {`
            @keyframes shimmerText {
              0% {
                background-position: 200% 50%;
              }
              100% {
                background-position: -200% 50%;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}