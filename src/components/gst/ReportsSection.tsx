
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileSpreadsheet, 
  Download, 
  Eye,
  BarChart3,
  Calendar,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { ReconciliationResult } from "@/pages/GSTReconciliation";

interface ReportsSectionProps {
  reconciliationResults: ReconciliationResult[];
}

const ReportsSection: React.FC<ReportsSectionProps> = ({ reconciliationResults }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status: ReconciliationResult['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ReconciliationResult['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4" />;
      case 'failed': return <AlertTriangle className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Reconciliation Reports
          </CardTitle>
          <CardDescription>
            View and download generated reconciliation reports
          </CardDescription>
        </CardHeader>
      </Card>

      {reconciliationResults.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <FileSpreadsheet className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Generated Yet</h3>
              <p className="text-gray-500 mb-6">
                Complete a reconciliation process to generate your first report
              </p>
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                Start Reconciliation
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reconciliationResults.map((result) => (
            <Card key={result.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(result.status)}
                    <div className="space-y-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Reconciliation Report #{result.id}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Generated: {formatDate(result.timestamp)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                          GSTR-2A: {result.gstr2aFile}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileSpreadsheet className="h-4 w-4 text-green-600" />
                          Invoice: {result.invoiceFile}
                        </span>
                      </div>

                      {result.status === 'completed' && (
                        <div className="flex items-center gap-6 mt-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="text-sm">
                              <strong className="text-green-700">{result.matchedRecords.toLocaleString()}</strong> matched
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm">
                              <strong className="text-red-700">{result.unmatchedRecords.toLocaleString()}</strong> unmatched
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">
                              <strong className="text-blue-700">
                                {Math.round((result.matchedRecords / (result.matchedRecords + result.unmatchedRecords)) * 100)}%
                              </strong> match rate
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(result.status)}>
                      {result.status.toUpperCase()}
                    </Badge>
                    
                    {result.status === 'completed' && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                {result.reportPath && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      Report file: <span className="font-mono">{result.reportPath}</span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Report Analytics Summary */}
      {reconciliationResults.length > 0 && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Analytics Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">{reconciliationResults.length}</p>
                <p className="text-sm text-blue-600">Total Reports</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-900">
                  {reconciliationResults.filter(r => r.status === 'completed').length}
                </p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-900">
                  {reconciliationResults.reduce((sum, r) => sum + r.matchedRecords, 0).toLocaleString()}
                </p>
                <p className="text-sm text-orange-600">Total Matched</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-900">
                  {reconciliationResults.reduce((sum, r) => sum + r.unmatchedRecords, 0).toLocaleString()}
                </p>
                <p className="text-sm text-red-600">Total Unmatched</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReportsSection;
