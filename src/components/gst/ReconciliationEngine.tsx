
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  FileSpreadsheet, 
  ArrowRight,
  Settings,
  Play
} from "lucide-react";
import { FileData } from "@/pages/GSTReconciliation";

interface ReconciliationEngineProps {
  files: FileData[];
  onReconcile: (gstr2aFileId: string, invoiceFileId: string) => void;
  isProcessing: boolean;
}

const ReconciliationEngine: React.FC<ReconciliationEngineProps> = ({ 
  files, 
  onReconcile, 
  isProcessing 
}) => {
  const [selectedGstr2a, setSelectedGstr2a] = useState<string>('');
  const [selectedInvoice, setSelectedInvoice] = useState<string>('');

  const gstr2aFiles = files.filter(f => f.type === 'gstr2a');
  const invoiceFiles = files.filter(f => f.type === 'invoice');

  const canReconcile = selectedGstr2a && selectedInvoice && !isProcessing;

  const handleReconcile = () => {
    if (canReconcile) {
      onReconcile(selectedGstr2a, selectedInvoice);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            GST Reconciliation Engine
          </CardTitle>
          <CardDescription>
            Select cleaned files to perform reconciliation analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* File Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* GSTR-2A Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Select GSTR-2A File
                </label>
                <Select value={selectedGstr2a} onValueChange={setSelectedGstr2a}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose GSTR-2A file" />
                  </SelectTrigger>
                  <SelectContent>
                    {gstr2aFiles.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No cleaned GSTR-2A files available
                      </SelectItem>
                    ) : (
                      gstr2aFiles.map(file => (
                        <SelectItem key={file.id} value={file.id}>
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-blue-600" />
                            <span>{file.name}</span>
                            <Badge className="ml-auto bg-green-100 text-green-800">
                              {file.recordCount} records
                            </Badge>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>

              {/* Invoice Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">
                  Select Invoice File
                </label>
                <Select value={selectedInvoice} onValueChange={setSelectedInvoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Invoice file" />
                  </SelectTrigger>
                  <SelectContent>
                    {invoiceFiles.length === 0 ? (
                      <SelectItem value="none" disabled>
                        No cleaned Invoice files available
                      </SelectItem>
                    ) : (
                      invoiceFiles.map(file => (
                        <SelectItem key={file.id} value={file.id}>
                          <div className="flex items-center gap-2">
                            <FileSpreadsheet className="h-4 w-4 text-green-600" />
                            <span>{file.name}</span>
                            <Badge className="ml-auto bg-green-100 text-green-800">
                              {file.recordCount} records
                            </Badge>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reconciliation Button */}
            <div className="flex justify-center pt-4">
              <Button 
                onClick={handleReconcile}
                disabled={!canReconcile}
                size="lg"
                className="px-8"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Reconciliation
              </Button>
            </div>

            {/* Status Messages */}
            {gstr2aFiles.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  No cleaned GSTR-2A files available. Please upload and clean GSTR-2A files first.
                </p>
              </div>
            )}

            {invoiceFiles.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  No cleaned Invoice files available. Please upload and clean Invoice files first.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reconciliation Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="h-5 w-5" />
            Reconciliation Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Matching Criteria</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  GSTIN Number matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Invoice Number matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Invoice Date matching
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Invoice Amount matching
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Variance Analysis</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Amount discrepancies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Tax rate variations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Missing transactions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  Duplicate entries
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Process Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-medium text-blue-900">Reconciliation Process</h4>
            <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
              <li>Data validation and preprocessing</li>
              <li>Record matching using multiple criteria</li>
              <li>Variance identification and categorization</li>
              <li>Exception analysis and reporting</li>
              <li>Automated report generation and export</li>
            </ol>
            <p className="text-xs text-blue-600 mt-3">
              The reconciliation report will be automatically generated and opened upon completion.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReconciliationEngine;
