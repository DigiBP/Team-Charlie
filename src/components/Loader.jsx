import "./Loader.css";
function Loader() {
  return (
    <div className="pt-4 pb-4">
      <div className="DNA_cont d-flex justify-content-center">
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
        <div className="nucleobase"></div>
      </div>
      <div className="float-left text-center mt-4 pt-4">Loading ...</div>
    </div>
  );
}
export default Loader;