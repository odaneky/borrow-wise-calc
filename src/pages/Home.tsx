import ComingSoon from "../components/ComingSoon";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <ComingSoon 
        title="Welcome Home"
        description="Your personal financial dashboard is being crafted with care. This will be your central hub for managing all your financial needs."
        icon="🏠"
      />
    </div>
  );
};

export default Home;