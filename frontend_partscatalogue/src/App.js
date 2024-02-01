import { Route, Routes } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { RoutePages } from './routes';
import LayoutMain from './layoutMain/layoutMain';
function App() {
  return (
    <>
      <Routes>
        {
          RoutePages.map(
            (route, index) => {
              const Page = route.compponent;
              const Layout = route.layout || LayoutMain
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout isCard={route.isCard || false} isFromSearch={route.isFromSearch || false}>
                      <Page />
                    </Layout>
                  } />
              )
            }
          )
        }
      </Routes>
    </>
  );
}

export default App;
