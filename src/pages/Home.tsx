import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import { Calculator, TrendingUp, PiggyBank, Target, Shield, Smartphone } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-b-[50px]" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full border mb-8">
            <span className="text-2xl">💰</span>
            <span className="text-sm font-medium text-muted-foreground">Smart Financial Planning</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Your Complete
            <span className="text-primary block">Financial Toolkit</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Calculate loans, assess affordability, and plan your financial future with our intelligent tools designed for smart decision-making.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/tools">
              <Button size="lg" className="px-8 py-3 text-lg font-semibold">
                <Calculator className="mr-2 h-5 w-5" />
                Explore Tools
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              <TrendingUp className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Financial Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed financial decisions in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Loan Calculator */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Calculator className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Smart Loan Calculator</h3>
                <p className="text-muted-foreground mb-4">
                  Calculate monthly payments, interest costs, and create detailed amortization schedules for any loan type.
                </p>
                <div className="flex items-center text-sm text-primary font-medium">
                  Available Now
                  <span className="ml-2 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                </div>
              </CardContent>
            </Card>

            {/* Affordability Calculator */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="bg-success/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-success/20 transition-colors">
                  <PiggyBank className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Affordability Assessment</h3>
                <p className="text-muted-foreground mb-4">
                  Determine what you can afford based on your income, expenses, and financial goals.
                </p>
                <div className="flex items-center text-sm text-success font-medium">
                  Available Now
                  <span className="ml-2 w-2 h-2 bg-success rounded-full animate-pulse"></span>
                </div>
              </CardContent>
            </Card>

            {/* Budget Planner */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
              <CardContent className="p-6">
                <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-accent/20 transition-colors">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Budget Planner</h3>
                <p className="text-muted-foreground mb-4">
                  Create and track budgets, set financial goals, and monitor your spending patterns.
                </p>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  Coming Soon
                  <span className="ml-2 px-2 py-1 bg-muted rounded text-xs">Q1 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Investment Tracker */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-destructive/20">
              <CardContent className="p-6">
                <div className="bg-destructive/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-destructive/20 transition-colors">
                  <TrendingUp className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Investment Tracker</h3>
                <p className="text-muted-foreground mb-4">
                  Track your investments, analyze performance, and optimize your portfolio allocation.
                </p>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  Coming Soon
                  <span className="ml-2 px-2 py-1 bg-muted rounded text-xs">Q2 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Credit Score Monitor */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
              <CardContent className="p-6">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Credit Score Monitor</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor your credit score, get improvement tips, and track your credit health over time.
                </p>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  Coming Soon
                  <span className="ml-2 px-2 py-1 bg-muted rounded text-xs">Q3 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Mobile App */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-success/20">
              <CardContent className="p-6">
                <div className="bg-success/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-success/20 transition-colors">
                  <Smartphone className="h-8 w-8 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Mobile App</h3>
                <p className="text-muted-foreground mb-4">
                  Access all your financial tools on the go with our dedicated mobile application.
                </p>
                <div className="flex items-center text-sm text-muted-foreground font-medium">
                  Coming Soon
                  <span className="ml-2 px-2 py-1 bg-muted rounded text-xs">Q4 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border-2 border-primary/10">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Take Control of Your Finances?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Start with our current tools and be the first to know when new features launch.
              </p>
              <Link to="/tools">
                <Button size="lg" className="px-8 py-3 text-lg font-semibold">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;