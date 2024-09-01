import { CSSProperties } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

function Loader() {

  const loaderOverride: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <PacmanLoader
        color={"#ffffff"}
        loading={true}
        cssOverride={loaderOverride}
        size={60} // Ajusta el tamaño del loader según sea necesario
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default Loader