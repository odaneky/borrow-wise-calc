import ComingSoon from "../components/ComingSoon";
import Header from "../components/Header";

const Loans = () => {
  return (
    <div>
      <Header />
      <ComingSoon 
        title="Active Loans"
        description="Manage your current loans, view payment schedules, and track your progress. Your complete loan portfolio will be available here."
        icon="💳"
      />
    </div>
  );
};

export default Loans;