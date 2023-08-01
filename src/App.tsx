import MainLayout from "./layouts/MainLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;
