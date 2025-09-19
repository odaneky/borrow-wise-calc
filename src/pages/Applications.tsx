import ComingSoon from "../components/ComingSoon";
import Header from "../components/Header";

const Applications = () => {
  return (
    <div>
      <Header />
      <ComingSoon 
        title="Loan Applications"
        description="Track and manage your loan applications in one convenient place. Submit new applications, check status updates, and manage your financial journey."
        icon="📋"
      />
    </div>
  );
};

export default Applications;