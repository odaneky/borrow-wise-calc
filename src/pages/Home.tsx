import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import { 
  Calculator, 
  DollarSign, 
  Car, 
  CreditCard, 
  Lightbulb,
  TrendingUp,
  Calendar,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { Badge } from "../components/ui/badge";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Welcome Section */}
      <section className="px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Hey Jessy
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back to your dashboard. Here's what's happening with your finances today.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Active Loans */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm font-medium">Active Loans</p>
                  <p className="text-3xl font-bold text-foreground">2</p>
                  <Badge className="bg-success text-success-foreground text-xs px-2 py-1">
                    +1 this month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Total Borrowed */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm font-medium">Total Borrowed</p>
                  <p className="text-3xl font-bold text-foreground">$45K</p>
                  <Badge className="bg-success text-success-foreground text-xs px-2 py-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    12%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Payment */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm font-medium">Next Payment</p>
                  <p className="text-3xl font-bold text-foreground">$850</p>
                  <Badge className="bg-warning text-warning-foreground text-xs px-2 py-1">
                    Due in 5 days
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Credit Score */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm font-medium">Credit Score</p>
                  <p className="text-3xl font-bold text-foreground">742</p>
                  <Badge className="bg-success text-success-foreground text-xs px-2 py-1">
                    +8 points
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Active Applications Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Active Applications</h2>
            <Link to="/applications" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {/* Unsecured Personal Loan Application */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Unsecured Personal Loan</h3>
                      <p className="text-muted-foreground text-sm">#28427</p>
                      <div className="w-24 h-1 bg-muted rounded-full mt-2">
                        <div className="w-1/4 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
                      Resume <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                    <Button variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auto Loan Application */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                      <Car className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Auto Loan</h3>
                      <p className="text-muted-foreground text-sm">#28428</p>
                      <div className="w-24 h-1 bg-muted rounded-full mt-2">
                        <div className="w-3/4 h-full bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
                      View <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                    <Button variant="outline">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Our Products</h2>
            <Link to="/loans" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              Explore all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Unsecured Loan */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200 relative">
              <CardContent className="p-8">
                <Badge className="absolute top-4 left-4 bg-muted text-muted-foreground text-xs">
                  MOST POPULAR
                </Badge>
                <div className="mt-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                    <DollarSign className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Unsecured Loan</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Quick approval personal loans with competitive rates. 
                    No collateral required. Get funds in 24 hours.
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-dark">
                    Apply Now <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auto Loan */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200 relative">
              <CardContent className="p-8">
                <Badge className="absolute top-4 left-4 bg-muted text-muted-foreground text-xs">
                  LOW INTEREST
                </Badge>
                <div className="mt-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <Car className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Auto Loan</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Finance your dream car with rates starting at 4.9% APR. 
                    Up to 100% financing available.
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-dark">
                    Apply Now <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Payday Loan */}
            <Card className="shadow-card hover:shadow-elevated transition-shadow duration-200 relative">
              <CardContent className="p-8">
                <Badge className="absolute top-4 left-4 bg-muted text-muted-foreground text-xs">
                  INSTANT
                </Badge>
                <div className="mt-6">
                  <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">
                    <CreditCard className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Payday Loan</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Get emergency cash instantly. Minimal documentation required for quick approval.
                  </p>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-dark">
                    Apply Now <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Tools Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Financial Tools</h2>
            <Link to="/tools" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              All tools <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Monthly Payment Calculator */}
            <Card className="bg-panel-dark text-panel-dark-foreground shadow-elevated hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Monthly Payment Calculator</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Calculate your monthly loan payments instantly. 
                    Compare different loan amounts, terms, and interest 
                    rates to find what works best for your budget.
                  </p>
                </div>
                <Link to="/tools?tool=loan">
                  <Button className="w-full bg-white text-panel-dark hover:bg-white/90">
                    Launch Calculator <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Affordability Checker */}
            <Card className="bg-panel-dark text-panel-dark-foreground shadow-elevated hover:shadow-elevated transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Affordability Checker</h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    Discover how much you can safely borrow based on 
                    your income, expenses, and financial goals. Get 
                    personalized recommendations.
                  </p>
                </div>
                <Link to="/tools?tool=affordability">
                  <Button className="w-full bg-white text-panel-dark hover:bg-white/90">
                    Check Now <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;