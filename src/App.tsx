import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import { fetchTabsAsyncThunk } from "./redux/pagesSlice";
import { Route, Routes } from "react-router-dom";
import {
  NavBar,
  WorkPage,
  LessonPage,
  ContactPage,
  Landing,
  BioPage,
} from "./components";
import { selectPages } from "./redux/pagesSlice";
import { PageContainer } from "./components/emotion";

function App() {
  const dispatch = useAppDispatch();
  const { comics, illustrations, status, error } = useAppSelector(selectPages);

  useEffect(() => {
    dispatch(fetchTabsAsyncThunk());
  }, [dispatch]);

  const formatTabs = ({ tabName }: { tabName: string }) => tabName;

  return (
    <main id="main">
      <div id="background"></div>
      {comics && illustrations ? (
        <>
          <NavBar
            comics={comics.map(formatTabs)}
            illustrations={illustrations.map(formatTabs)}
          />
          <PageContainer id="page-container">
            <Routes>
              <Route
                path="/comics/:slug"
                element={<WorkPage category="comics" />}
              />
              <Route
                path="/illustrations/:slug"
                element={<WorkPage category="illustrations" />}
              />
              <Route path="/lessons" element={<LessonPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/bio" element={<BioPage />} />
              <Route path="/*" element={<Landing />} />
            </Routes>
          </PageContainer>
        </>
      ) : (
        <div>{status === "loading" ? "Loading..." : "Error!"}</div>
      )}
    </main>
  );
}

export default App;
