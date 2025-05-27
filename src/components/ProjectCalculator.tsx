
import { useState } from 'react';
import { Calculator, Building, Home, Wrench, Leaf, ArrowRight } from 'lucide-react';

interface ProjectDetails {
  type: string;
  area: string;
  budget: string;
  timeline: string;
  features: string[];
}

const projectTypes = [
  { id: 'commercial', name: 'Commercial', icon: Building, baseRate: 1800 },
  { id: 'residential', name: 'Residential', icon: Home, baseRate: 1200 },
  { id: 'infrastructure', name: 'Infrastructure', icon: Wrench, baseRate: 2200 },
  { id: 'green', name: 'Green Building', icon: Leaf, baseRate: 1600 }
];

const features = [
  { id: 'smart', name: 'Smart Building Technology', multiplier: 1.15 },
  { id: 'solar', name: 'Solar Power System', multiplier: 1.1 },
  { id: 'parking', name: 'Multi-level Parking', multiplier: 1.05 },
  { id: 'landscape', name: 'Premium Landscaping', multiplier: 1.08 },
  { id: 'security', name: 'Advanced Security System', multiplier: 1.06 },
  { id: 'hvac', name: 'Central HVAC System', multiplier: 1.12 }
];

const ProjectCalculator = () => {
  const [step, setStep] = useState(1);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    type: '',
    area: '',
    budget: '',
    timeline: '',
    features: []
  });
  const [estimate, setEstimate] = useState<{
    cost: number;
    timeline: string;
    breakdown: { [key: string]: number };
  } | null>(null);

  const calculateEstimate = () => {
    const selectedType = projectTypes.find(type => type.id === projectDetails.type);
    if (!selectedType || !projectDetails.area) return;

    const area = parseInt(projectDetails.area);
    let baseCost = selectedType.baseRate * area;

    // Apply feature multipliers
    let featureMultiplier = 1;
    projectDetails.features.forEach(featureId => {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        featureMultiplier *= feature.multiplier;
      }
    });

    const totalCost = baseCost * featureMultiplier;
    
    // Calculate timeline based on area and complexity
    const baseMonths = Math.max(6, Math.ceil(area / 5000) * 3);
    const complexityFactor = projectDetails.features.length * 0.5;
    const timeline = Math.ceil(baseMonths + complexityFactor);

    setEstimate({
      cost: totalCost,
      timeline: `${timeline} months`,
      breakdown: {
        base: baseCost,
        features: totalCost - baseCost,
        total: totalCost
      }
    });
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      calculateEstimate();
      setStep(5);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const resetCalculator = () => {
    setStep(1);
    setProjectDetails({
      type: '',
      area: '',
      budget: '',
      timeline: '',
      features: []
    });
    setEstimate(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">What type of project are you planning?</h3>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes.map(type => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setProjectDetails(prev => ({ ...prev, type: type.id }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                      projectDetails.type === type.id
                        ? 'border-moonscape-accent bg-moonscape-accent/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-moonscape-accent/50'
                    }`}
                  >
                    <IconComponent size={24} className="mb-2 text-moonscape-accent" />
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs text-gray-500">₹{type.baseRate}/sq ft</div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">What's the approximate area?</h3>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Enter area in square feet"
                value={projectDetails.area}
                onChange={(e) => setProjectDetails(prev => ({ ...prev, area: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-moonscape-navy/50 focus:outline-none focus:ring-2 focus:ring-moonscape-accent"
              />
              <div className="grid grid-cols-3 gap-2">
                {['1000', '5000', '10000'].map(area => (
                  <button
                    key={area}
                    onClick={() => setProjectDetails(prev => ({ ...prev, area }))}
                    className="py-2 px-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:border-moonscape-accent transition-colors"
                  >
                    {area} sq ft
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">What's your budget range?</h3>
            <div className="space-y-2">
              {['50L-1Cr', '1-5Cr', '5-10Cr', '10Cr+'].map(budget => (
                <button
                  key={budget}
                  onClick={() => setProjectDetails(prev => ({ ...prev, budget }))}
                  className={`w-full p-3 text-left rounded-lg border-2 transition-all duration-300 ${
                    projectDetails.budget === budget
                      ? 'border-moonscape-accent bg-moonscape-accent/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-moonscape-accent/50'
                  }`}
                >
                  ₹{budget}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Select additional features</h3>
            <div className="space-y-2">
              {features.map(feature => (
                <label
                  key={feature.id}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-moonscape-navy/30 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={projectDetails.features.includes(feature.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setProjectDetails(prev => ({
                          ...prev,
                          features: [...prev.features, feature.id]
                        }));
                      } else {
                        setProjectDetails(prev => ({
                          ...prev,
                          features: prev.features.filter(f => f !== feature.id)
                        }));
                      }
                    }}
                    className="w-4 h-4 text-moonscape-accent focus:ring-moonscape-accent border-gray-300 rounded"
                  />
                  <span className="flex-1">{feature.name}</span>
                  <span className="text-sm text-moonscape-accent">+{((feature.multiplier - 1) * 100).toFixed(0)}%</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-moonscape-accent mb-2">
                {estimate && formatCurrency(estimate.cost)}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Estimated Project Cost</p>
            </div>

            {estimate && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-moonscape-navy/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Cost Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Construction</span>
                      <span>{formatCurrency(estimate.breakdown.base)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Additional Features</span>
                      <span>{formatCurrency(estimate.breakdown.features)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Estimate</span>
                      <span>{formatCurrency(estimate.breakdown.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-moonscape-accent/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator size={16} className="text-moonscape-accent" />
                    <span className="font-semibold">Project Timeline</span>
                  </div>
                  <p className="text-lg font-bold text-moonscape-accent">{estimate.timeline}</p>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  * This is a preliminary estimate. Final cost may vary based on site conditions, material selection, and detailed requirements.
                </div>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={resetCalculator}
                className="w-full py-3 border border-moonscape-accent text-moonscape-accent rounded-lg hover:bg-moonscape-accent hover:text-white transition-colors"
              >
                Calculate Another Project
              </button>
              <button className="w-full py-3 bg-moonscape-accent text-white rounded-lg hover:bg-moonscape-blue transition-colors">
                Get Detailed Quote
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-moonscape-navy rounded-xl p-6 shadow-lg max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-moonscape-accent/10 rounded-lg flex items-center justify-center">
          <Calculator size={20} className="text-moonscape-accent" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Project Calculator</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Get instant estimate</p>
        </div>
      </div>

      {/* Progress Bar */}
      {step < 5 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Step {step} of 4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-moonscape-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-6">
        {renderStep()}
      </div>

      {/* Navigation */}
      {step < 5 && (
        <div className="flex gap-3">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-moonscape-navy/30 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            disabled={
              (step === 1 && !projectDetails.type) ||
              (step === 2 && !projectDetails.area) ||
              (step === 3 && !projectDetails.budget)
            }
            className="flex-1 py-3 bg-moonscape-accent text-white rounded-lg hover:bg-moonscape-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {step === 4 ? 'Calculate' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCalculator;
