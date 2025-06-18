
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  FileSpreadsheet, 
  CheckCircle2, 
  Shield,
  Zap,
  ArrowRight,
  Users,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                GST Reconciliation Tool
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Advanced, fraud-proof GST reconciliation system with intelligent data cleaning, 
                automated matching, and comprehensive reporting capabilities.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/gst-reconciliation">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Launch Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Professional GST Management
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with advanced algorithms and fraud detection mechanisms to ensure accuracy and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
            <CardHeader>
              <div className="p-3 rounded-lg bg-blue-100 w-fit">
                <FileSpreadsheet className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Smart File Management</CardTitle>
              <CardDescription>
                Advanced file upload with drag & drop, automatic validation, and intelligent file type detection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-format support (Excel, CSV)</li>
                <li>• Batch processing capabilities</li>
                <li>• File integrity validation</li>
                <li>• Original file preservation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-green-200">
            <CardHeader>
              <div className="p-3 rounded-lg bg-green-100 w-fit">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Data Cleaning Engine</CardTitle>
              <CardDescription>
                Sophisticated data standardization and cleaning algorithms with maximum data handling capacity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Duplicate detection & removal</li>
                <li>• Format standardization</li>
                <li>• Missing data handling</li>
                <li>• GSTIN validation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
            <CardHeader>
              <div className="p-3 rounded-lg bg-purple-100 w-fit">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Advanced Reconciliation</CardTitle>
              <CardDescription>
                Intelligent matching algorithms with comprehensive variance analysis and exception handling.
              </CardDescription>
            </CardContent>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Multi-criteria matching</li>
                <li>• Real-time progress tracking</li>
                <li>• Variance categorization</li>
                <li>• Exception flagging</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-orange-200">
            <CardHeader>
              <div className="p-3 rounded-lg bg-orange-100 w-fit">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Fraud Prevention</CardTitle>
              <CardDescription>
                Built-in fraud detection mechanisms with comprehensive error handling and validation.
              </CardDescription>
            </CardContent>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Anomaly detection</li>
                <li>• Pattern recognition</li>
                <li>• Data integrity checks</li>
                <li>• Audit trail maintenance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-indigo-200">
            <CardHeader>
              <div className="p-3 rounded-lg bg-indigo-100 w-fit">
                <CheckCircle2 className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Automated Reporting</CardTitle>
              <CardDescription>
                Professional report generation with automatic export and comprehensive analytics.
              </CardDescription>
            </CardContent>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Instant report generation</li>
                <li>• Multiple export formats</li>
                <li>• Visual analytics</li>
                <li>• Executive summaries</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-teal-200">
            <CardHeader>
              <div className="p-3 rounded-lg bg-teal-100 w-fit">
                <TrendingUp className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle>Dashboard Analytics</CardTitle>
              <CardDescription>
                Interactive dashboard with real-time insights and comprehensive data visualization.
              </CardDescription>
            </CardContent>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Real-time statistics</li>
                <li>• Interactive charts</li>
                <li>• Performance metrics</li>
                <li>• Historical trends</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Streamline Your GST Reconciliation?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of professionals who trust our advanced GST reconciliation platform.
          </p>
          <Link to="/gst-reconciliation">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
