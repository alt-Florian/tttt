import MissionCardTimer from "@components/Mission/MissionCardTimer";
import AuthGuard from "@components/ui/AuthGuard";
import DocumentationCenter from "@components/ui/docsSection/DocumentationCenter";
import Layout from "@components/ui/Layout/Layout";
import Overlays from "@components/ui/Layout/Overlay";
import VersionPage from "@components/Version";

import BankDetailForm from "@pages/Config/BankDetails/BankDetailForm.page";
import BankDetailList from "@pages/Config/BankDetails/BankDetailsList";
import BlockForm from "@pages/Config/Block/BlockForm.page";
import BlockList from "@pages/Config/Block/BlockList";
import ConfigPage from "@pages/Config/Config.page";
import CustomerConfigForm from "@pages/Config/CustomerConfig/CustomerConfigForm.page";
import CustomerConfigList from "@pages/Config/CustomerConfig/CustomerConfigList";
import LetterTemplateForm from "@pages/Config/LetterTemplate/LetterTemplateForm.page";
import LetterTemplateList from "@pages/Config/LetterTemplate/LetterTemplateList";
import NatureForm from "@pages/Config/Nature/NatureForm.page";
import NatureList from "@pages/Config/Nature/NatureList";
import PriceForm from "@pages/Config/Price/PriceForm.page";
import PriceList from "@pages/Config/Price/PriceList";
import TaskForm from "@pages/Config/Task/TaskForm.page";
import TaskList from "@pages/Config/Task/TaskList";
import ContactsPage from "@pages/Contacts/Contacts.page";
import CorporateCustomerEnterprises from "@pages/Customer/Corporate/CorporateCustomerEnterprises";
import CorporateCustomerFilePage from "@pages/Customer/Corporate/CorporateCustomerFile.page";
import CorporateCustomerProfile from "@pages/Customer/Corporate/CorporateCustomerProfile";
import CustomerInvoicesList from "@pages/Customer/CustomerInvoicesList";
import CustomerMissions from "@pages/Customer/CustomerMissions";
import CustomerMissionsLettersList from "@pages/Customer/CustomerMissionsLettersList";
import CustomerMissionsList from "@pages/Customer/CustomerMissionsList";

import PhysicalCustomerEnterprises from "@pages/Customer/Physical/PhysicalCustomerEnterprises";
import PhysicalCustomerFilePage from "@pages/Customer/Physical/PhysicalCustomerFile.page";
import PhysicalCustomerProfile from "@pages/Customer/Physical/PhysicalCustomerProfile";
import CustomersPage from "@pages/Customers/Customers.page";
//import HomePage from "@pages/Home/Home.page";
import HomeDraftPage from "@pages/Home/HomeDraft.page";
import Dashboard from "@pages/Home/HomeDraft.page";
import LetterMissionsPage from "@pages/LetterMissions/LetterMissions.page";
import MissionPage from "@pages/Mission/Mission.page";
import MissionsPage from "@pages/Missions/Missions.page";
import SignInPage from "@pages/SignIn/SignIn.page";
import UsersListPage from "@pages/User/UsersList.page";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes } from "react-router-dom";
// import LetterMissionListPage from "@pages/LetterMission/LetterMissionList/LetterMission.page";
import LetterMissionForm from "@pages/LetterMission/LetterMissionForm/LetterMission.form";
import LetterMissionFormStep1 from "@pages/LetterMission/LetterMissionForm/LetterMissionStep1/LetterMissionStep1.form";
import LetterMissionFormStep2 from "@pages/LetterMission/LetterMissionForm/LetterMissionStep2/LetterMissionStep2.form";
import LetterMissionFormStep3 from "@pages/LetterMission/LetterMissionForm/LetterMissionStep3/LetterMissionStep3.form";
//import LetterMissionFormUpdate from "./Pages/LetterMission/LetterMissionForm/LetterMissionUpdate/LetterMissionUpdate.form";
import LetterMissionFormUpdate from "@pages/LetterMission/LetterMissionForm/LetterMissionUpdate/LetterMissionUpdate.form";

import BuildPdfPage from "@pages/LetterMission/BuildPdf/buildPdf.page";
import DocumentStepper from "@pages/Documents/centralisationTresorerie/index.page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signin" element={<SignInPage />} />

        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomeDraftPage />} />
           
            <Route path="/users" element={<UsersListPage />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/version" element={<VersionPage />} />
            <Route path="/doc" element={<DocumentStepper  />} />
            <Route path="/help" element={<DocumentationCenter />} />
             <Route path="/letterMissions" element={<LetterMissionsPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/mission/:idmission" element={<MissionPage />} />
            <Route path="/configs" element={<ConfigPage />}>
              <Route index element={<Navigate to="bank-details" replace />} />
              <Route path="bank-details" element={<BankDetailList />} />
              <Route path="letter-templates" element={<LetterTemplateList />} />
              <Route path="natures" element={<NatureList />} />
              <Route path="prices" element={<PriceList />} />
              <Route path="blocks" element={<BlockList />} />
              <Route path="tasks" element={<TaskList />} />
              <Route path="customer-configs" element={<CustomerConfigList />} />
            </Route>
            <Route
              path="/configs/bank-detail-form/:id?"
              element={<BankDetailForm />}
            />
            <Route
              path="/configs/letter-template-form/:id?"
              element={<LetterTemplateForm />}
            />
            <Route path="/configs/block-form/:id?" element={<BlockForm />} />
            <Route path="/configs/nature-form/:id?" element={<NatureForm />} />
            <Route path="/configs/price-form/:id?" element={<PriceForm />} />
            <Route path="/configs/task-form/:id?" element={<TaskForm />} />
            <Route
              path="/configs/customer-form/:id?"
              element={<CustomerConfigForm />}
            />
             <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/customers" element={<CustomersPage />} />

            <Route
              path="/customers/physical/:id"
              element={<PhysicalCustomerFilePage />}
            >
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<PhysicalCustomerProfile />} />
              <Route
                path="enterprises"
                element={<PhysicalCustomerEnterprises />}
              />
              {/* <Route path="missions" element={<Missions />} /> */}

              <Route path="missions" element={<CustomerMissions />}>
                <Route
                  index
                  element={<Navigate to="letters-missions" replace />}
                />
                <Route
                  path="letters-missions"
                  element={<CustomerMissionsLettersList />}
                />
                <Route path="missions" element={<CustomerMissionsList />} />
                <Route
                  path="invoices"
                  element={<CustomerInvoicesList />}
                ></Route>
              </Route>
            </Route>
            <Route
              path="/customers/corporate/:id"
              element={<CorporateCustomerFilePage />}
            >
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<CorporateCustomerProfile />} />
              <Route
                path="enterprises"
                element={<CorporateCustomerEnterprises />}
              />
              <Route path="missions" element={<CustomerMissions />}>
              <Route
                index
                element={<Navigate to="letters-missions" replace />}
              />
              <Route
                path="letters-missions"
                element={<CustomerMissionsLettersList />}
              />
              <Route path="missions" element={<CustomerMissionsList />} />
              <Route path="invoices" element={<CustomerInvoicesList />}></Route>
            </Route>
             
            </Route>

            <Route
              path="/letter-mission/create"
              element={<LetterMissionForm />}
            >
              <Route path="step1" element={<LetterMissionFormStep1 />} />
              <Route path="step2" element={<LetterMissionFormStep2 />} />
              <Route path="step3" element={<LetterMissionFormStep3 />} />
            </Route>

            <Route
              path="/letter-mission/export/:id"
              element={<BuildPdfPage />}
            />
                        <Route
              path="/letter-mission/:id"
              element={<LetterMissionFormUpdate />}
            />
          </Route>
         
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <MissionCardTimer />

      <Overlays />
      <ReactQueryDevtools />
    </>
  );
}

export default App;
