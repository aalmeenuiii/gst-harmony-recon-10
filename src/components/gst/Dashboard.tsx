
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Clock,
  Database,
  Activity
} from "lucide-react";
import { FileData, ReconciliationResult } from "@/pages/GSTReconciliation";

interface DashboardProps {
  files: FileData[];
  reconciliationResults: ReconciliationResult[];
}

const Dashboard: React.FC<DashboardProps> = ({ files, reconciliationResults }) => {
  const gstr2aFiles = files.filter(f => f.type === 'gstr2a');
  const invoiceFiles = files.filter(f => f.type === 'invoice');
  const cleanedFiles = files.filter(f => f.status === 'cleaned');
  const totalRecords = files.reduce((sum, file) => sum + file.recordCount, 0);
  
  const completedReconciliations = reconciliationResults.filter(r => r.status === 'completed');
  const totalMatched = completedReconciliations.reduce((sum, result) => sum + result.matchedRecords, 0);
  const totalUnmatched = completedReconciliations.reduce((sum, result) => sum + result.unmatchedRecords, 0);

  const StatCard = ({ title, value, description, icon: Icon, color = "blue" }: {
    title: string;
    value: string | number;
    description: string;
    icon: any;
    color?: string;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-lg bg-${color}-100`}>
            <Icon className={`h-6 w-6 text-${color}-600`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Files"
          value={files.length}
          description="Uploaded files"
          icon={FileSpreadsheet}
          color="blue"
        />
        <StatCard
          title="Cleaned Files"
          value={cleanedFiles.length}
          description="Ready for reconciliation"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Total Records"
          value={totalRecords.toLocaleString()}
          description="Across all files"
          icon={Database}
          color="purple"
        />
        <StatCard
          title="Reconciliations"
          value={completedReconciliations.length}
          description="Completed analyses"
          icon={Activity}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              File Overview
            </CardTitle>
            <CardDescription>Current status of uploaded files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">GSTR-2A Files</p>
                    <p className="text-sm text-blue-600">
                      {gstr2aFiles.reduce((sum, f) => sum + f.recordCount, 0).toLocaleString()} records
                    </p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">
                  {gstr2aFiles.length} files
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Invoice Files</p>
                    <p className="text-sm text-green-600">
                      {invoiceFiles.reduce((sum, f) => sum + f.recordCount, 0).toLocaleString()} records
                    </p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {invoiceFiles.length} files
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest file uploads and processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <Clock className="mx-auto h-8 w-8 text-gray-300 mb-2" />
                  <p className="text-sm">No recent activity</p>
                </div>
              ) : (
                files.slice(0, 5).map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className={`h-4 w-4 ${
                        file.type === 'gstr2a' ? 'text-blue-600' : 'text-green-600'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.uploadDate.toLocaleDateString()} • {file.recordCount} records
                        </p>
                      </div>
                    </div>
                    <Badge className={
                      file.status === 'cleaned' ? 'bg-green-100 text-green-800' :
                      file.status === 'error' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }>
                      {file.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Summary */}
      {completedReconciliations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Reconciliation Summary
            </CardTitle>
            <CardDescription>Analysis results from completed reconciliations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle2 className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-green-900">{totalMatched.toLocaleString()}</p>
                <p className="text-sm text-green-600">Matched Records</p>
              </div>
              
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <AlertTriangle className="mx-auto h-8 w-8 text-red-600 mb-2" />
                <p className="text-2xl font-bold text-red-900">{totalUnmatched.toLocaleString()}</p>
                <p className="text-sm text-red-600">Unmatched Records</p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <TrendingUp className="mx-auto h-8 w-8 text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {totalMatched > 0 ? Math.round((totalMatched / (totalMatched + totalUnmatched)) * 100) : 0}%
                </p>
                <p className="text-sm text-blue-600">Match Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-blue-900">Quick Start Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2 text-blue-700">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                Upload your GSTR-2A and Invoice files
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                Clean and standardize the data
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                Run reconciliation analysis
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
