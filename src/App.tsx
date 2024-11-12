import { useState } from 'react';
import Navbar from './components/Navbar';
import { currentPageType } from './types/types';
import AddGroupForm from './components/AddGroupForm';
import ViewGroups from './components/ViewGroups';

function App() {
  const [curPage, setCurPage] = useState<currentPageType>("view");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-900">
      <Navbar currentPage={curPage} setCurrentPage={setCurPage} />

      <main className="flex-1 w-full max-w-4xl p-6 mt-4 bg-white shadow-lg rounded-lg">
        {curPage === "view" && <ViewGroups/>}
        {curPage === "add" && <AddGroupForm/>}
      </main>
    </div>
  );
}

export default App;