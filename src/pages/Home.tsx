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
  ChevronRight,
  CheckCircle,
  Circle,
  Clock,
  FileText
} from "lucide-react";
import { Badge } from "../components/ui/badge";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Welcome Section */}
      <section className="px-6 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Hey Jessy
            </h1>
            <p className="text-muted-foreground">
              Welcome back to your dashboard. Here's what's happening with your finances today.
            </p>
          </div>
          
          {/* Stats Cards - More Compact */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Active Loans */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Active Loans</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">
                    +1 this month
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Total Borrowed */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Total Borrowed</p>
                  <p className="text-2xl font-bold text-foreground">$45K</p>
                  <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5 flex items-center gap-1 w-fit">
                    <TrendingUp className="h-3 w-3" />
                    12%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Next Payment */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Next Payment</p>
                  <p className="text-2xl font-bold text-foreground">$850</p>
                  <Badge className="bg-warning text-warning-foreground text-xs px-2 py-0.5">
                    Due in 5 days
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Credit Score */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Credit Score</p>
                  <p className="text-2xl font-bold text-foreground">742</p>
                  <Badge className="bg-success text-success-foreground text-xs px-2 py-0.5">
                    +8 points
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Active Applications Section - Enhanced */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Active Applications</h2>
            <Link to="/applications" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {/* Unsecured Personal Loan Application */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-primary">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">Unsecured Personal Loan</h3>
                        <Badge variant="outline" className="text-xs">Application #28427</Badge>
                      </div>
                      
                      {/* Progress Steps */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-xs text-muted-foreground">Basic Info</span>
                        </div>
                        <div className="w-2 h-px bg-muted"></div>
                        <div className="flex items-center gap-1">
                          <Circle className="h-4 w-4 text-primary fill-current" />
                          <span className="text-xs text-primary font-medium">Documents</span>
                        </div>
                        <div className="w-2 h-px bg-muted"></div>
                        <div className="flex items-center gap-1">
                          <Circle className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Review</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Document verification pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="text-xs">
                      Resume <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auto Loan Application */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Car className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">Auto Loan</h3>
                        <Badge variant="outline" className="text-xs">Application #28428</Badge>
                      </div>
                      
                      {/* Progress Steps */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-xs text-muted-foreground">Basic Info</span>
                        </div>
                        <div className="w-2 h-px bg-muted"></div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-xs text-muted-foreground">Documents</span>
                        </div>
                        <div className="w-2 h-px bg-muted"></div>
                        <div className="flex items-center gap-1">
                          <Circle className="h-4 w-4 text-blue-500 fill-current" />
                          <span className="text-xs text-blue-500 font-medium">Review</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        <span>Under final review</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" className="text-xs bg-blue-500 hover:bg-blue-600">
                      View Status <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Products Section - Enhanced */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Our Products</h2>
            <Link to="/loans" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              Explore all <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Unsecured Loan */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
              <CardContent className="p-6">
                <Badge className="absolute top-3 right-3 bg-primary/10 text-primary text-xs font-medium">
                  MOST POPULAR
                </Badge>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Unsecured Loan</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Quick approval personal loans with competitive rates. No collateral required.
                </p>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-muted-foreground">Starting at</span>
                  <span className="font-semibold text-primary">5.9% APR</span>
                </div>
                <Button size="sm" className="w-full text-xs group-hover:bg-primary-dark transition-colors">
                  Apply Now <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Auto Loan */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
              <CardContent className="p-6">
                <Badge className="absolute top-3 right-3 bg-blue-500/10 text-blue-500 text-xs font-medium">
                  LOW INTEREST
                </Badge>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Car className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Auto Loan</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Finance your dream car with competitive rates. Up to 100% financing available.
                </p>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-muted-foreground">Starting at</span>
                  <span className="font-semibold text-blue-500">4.9% APR</span>
                </div>
                <Button size="sm" className="w-full text-xs bg-blue-500 hover:bg-blue-600">
                  Apply Now <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>

            {/* Payday Loan */}
            <Card className="rounded-xl shadow-sm hover:shadow-md transition-all duration-200 relative overflow-hidden group">
              <CardContent className="p-6">
                <Badge className="absolute top-3 right-3 bg-orange-500/10 text-orange-500 text-xs font-medium">
                  INSTANT
                </Badge>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Payday Loan</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Get emergency cash instantly. Minimal documentation required.
                </p>
                <div className="flex items-center justify-between text-xs mb-4">
                  <span className="text-muted-foreground">Approval in</span>
                  <span className="font-semibold text-orange-500">5 minutes</span>
                </div>
                <Button size="sm" className="w-full text-xs bg-orange-500 hover:bg-orange-600">
                  Apply Now <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Financial Tools Section - Compact */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground">Financial Tools</h2>
            <Link to="/tools" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
              All tools <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {/* Monthly Payment Calculator */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Payment Calculator</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Calculate monthly payments instantly. Compare different loan terms and rates.
                </p>
                <Link to="/tools?tool=loan">
                  <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-white/90 text-xs">
                    Launch Calculator <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Affordability Checker */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2">Affordability Checker</h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  Discover how much you can safely borrow based on your income and expenses.
                </p>
                <Link to="/tools?tool=affordability">
                  <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-white/90 text-xs">
                    Check Now <ArrowRight className="h-3 w-3 ml-1" />
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