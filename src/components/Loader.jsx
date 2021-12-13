import "./Loader.css";
function Loader() {
  return (
    <div className="pt-4 pb-4">
      <div className="DNA_cont d-flex justify-content-center mb-4">
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
      <br/>
      <div className="float-left text-center mt-4 pt-4">Loading ...</div>
    </div>
  );
}
export default Loader;