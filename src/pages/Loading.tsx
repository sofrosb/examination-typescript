import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

const Loading = () => {
  const navigate = useNavigate();

  return (
    <main className="wrapper">
      <img
        src="./src/assets/logo.svg"
        onClick={() => navigate("/booking")}
        className="logo"
      />
      <article className="title-wrapper">
        <h1>STRAJK</h1>
        <h2 className="loading-title">BOWLING</h2>
      </article>
    </main>
  );
};

export default Loading;
