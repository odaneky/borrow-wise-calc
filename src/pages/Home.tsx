import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import Header from "../components/Header";
import { Calculator, DollarSign, Car, CreditCard, PiggyBank, Building, MoreHorizontal, Play, Eye } from "lucide-react";
import { Progress } from "../components/ui/progress";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Welcome Section */}
      <section className="px-6 pt-24 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Hey Jessy
            </h1>
            <p className="text-muted-foreground">
              Welcome to your dashboard......
            </p>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Applications</h2>
          
          <div className="space-y-4 mb-12">
            {/* Unsecured Loan Application */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">#28427</div>
                      <h3 className="text-lg font-semibold">Unsecured</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs">In-Progress</span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">Submitted</span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">In-Review</span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">Negotiations</span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">Disbursement</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Resume
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Auto Loan Application */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Car className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">#28427</div>
                      <h3 className="text-lg font-semibold">Auto Loan</h3>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="px-3 py-1 bg-success text-success-foreground rounded-full text-xs">In-Progress</span>
                      <span className="px-3 py-1 bg-success text-success-foreground rounded-full text-xs">Submitted</span>
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs">In-Review</span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">Negotiations</span>
                      <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs">Disbursement</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="secondary" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Products</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Unsecured Loan */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Unsecured Loan</h3>
                  <p className="text-muted-foreground mb-4">
                    Product Description
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Auto Loan */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Car className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Auto Loan</h3>
                  <p className="text-muted-foreground mb-4">
                    Product Description
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Apply Now
                </Button>
              </CardContent>
            </Card>

            {/* Payday Loan */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Payday Loan</h3>
                  <p className="text-muted-foreground mb-4">
                    Product Description
                  </p>
                </div>
                <Button variant="secondary" size="sm">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Tools</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Loan Calculator */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="bg-success/10 p-3 rounded-lg w-fit mb-4">
                    <Calculator className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">See what you will pay monthly</h3>
                  <p className="text-muted-foreground mb-6">
                    Description
                  </p>
                </div>
                <Link to="/tools?tool=loan">
                  <Button variant="secondary">
                    Go to Calculator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Affordability Calculator */}
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="bg-accent/10 p-3 rounded-lg w-fit mb-4">
                    <PiggyBank className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Not sure what your can afford?</h3>
                  <p className="text-muted-foreground mb-6">
                    Description
                  </p>
                </div>
                <Link to="/tools?tool=affordability">
                  <Button variant="secondary">
                    Check Affordability
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