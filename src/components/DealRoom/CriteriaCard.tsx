import { Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CriteriaCardProps {
  criteria: {
    creditWorthy: string;
    technicallyViable: string;
    timeline: string;
    cashFlow: string;
  };
  onCriteriaChange: (e: any) => void;
}

export function CriteriaCard({ criteria, onCriteriaChange }: CriteriaCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Underwriting Criteria</CardTitle>
          <Shield className="w-5 h-5 text-indigo-600" />
        </div>
        <CardDescription>Apply secure underwriting standards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <Label htmlFor="creditWorthy">Credit Worthiness Assessment</Label>
            <RadioGroup 
              name="creditWorthy" 
              value={criteria.creditWorthy}
              onValueChange={(value) => onCriteriaChange({target: {name: 'creditWorthy', value}})}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="creditWorthy-yes" />
                <Label htmlFor="creditWorthy-yes">Meets Standards</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="creditWorthy-no" />
                <Label htmlFor="creditWorthy-no">Does Not Meet Standards</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="technicallyViable">Technical Viability</Label>
            <RadioGroup 
              name="technicallyViable" 
              value={criteria.technicallyViable}
              onValueChange={(value) => onCriteriaChange({target: {name: 'technicallyViable', value}})}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="technicallyViable-yes" />
                <Label htmlFor="technicallyViable-yes">Viable</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="technicallyViable-no" />
                <Label htmlFor="technicallyViable-no">Not Viable</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="timeline">Implementation Timeline</Label>
            <Input 
              id="timeline" 
              name="timeline"
              value={criteria.timeline}
              onChange={onCriteriaChange}
              placeholder="e.g., 18 months"
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="cashFlow">Cash Flow Analysis</Label>
            <Textarea 
              id="cashFlow" 
              name="cashFlow"
              value={criteria.cashFlow}
              onChange={onCriteriaChange}
              placeholder="Enter detailed cash flow projections..."
              className="mt-2"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}