import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { AlertTriangle, CheckCircle2, HelpCircle, Truck, ShieldAlert, ArrowRight, Circle } from 'lucide-react';
import { Button } from "./components/ui/button";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import { Badge } from "./components/ui/badge";
import DarkModeToggle from './components/DarkModeToggle';

const LoadingRequirementsPoster = () => {
  const [activeTab, setActiveTab] = useState('requirements');
  const [tabsVisited, setTabsVisited] = useState({ requirements: false, principles: false, assessment: false });
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const requirements = [
    { icon: <Truck className="w-6 h-6 text-blue-500" />, text: "Load placement must not make the vehicle unsafe or unstable" },
    { icon: <ShieldAlert className="w-6 h-6 text-red-500" />, text: "Load must be unlikely to fall or be dislodged" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, text: "An appropriate restraint system must be used" }
  ];

  const principles = [
    "Choose suitable vehicles",
    "Determine proper load positioning",
    "Design effective restraint systems",
    "Use appropriate and sufficient equipment",
    "Ensure equipment is in good condition",
    "Provide comprehensive loading plans"
  ];

  const assessment = [
    "Is the position of the load making the vehicle unsafe or unstable?",
    "Is the load restrained so it's unlikely to fall or be dislodged from the vehicle?",
    "Is the load restraint method used appropriate for the type of load?"
  ];

  useEffect(() => {
    setTabsVisited(prev => ({ ...prev, [activeTab]: true }));
  }, [activeTab]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const allTabsVisited = Object.values(tabsVisited).every(Boolean);

  const handleNextClick = () => {
    setShowQuiz(true);
  };

  const handleSubmit = () => {
    setShowFeedback(true);
  };

  const quizQuestion = {
    question: "Which of the following is NOT one of the key loading requirements for heavy vehicles?",
    options: [
      "Load placement must not make the vehicle unsafe or unstable",
      "The load must be evenly distributed across the vehicle",
      "The load must be unlikely to fall or be dislodged",
      "An appropriate restraint system must be used"
    ],
    correctAnswer: "The load must be evenly distributed across the vehicle"
  };

  const TabStatus = ({ tabName }) => (
    <Badge variant={tabsVisited[tabName] ? "success" : "secondary"} className="ml-2">
      {tabsVisited[tabName] ? <CheckCircle2 className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
    </Badge>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-primary">Heavy Vehicle Loading Requirements</h1>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      
      {!showQuiz ? (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="requirements" className="flex items-center justify-center">
                Requirements
                <TabStatus tabName="requirements" />
              </TabsTrigger>
              <TabsTrigger value="principles" className="flex items-center justify-center">
                Principles
                <TabStatus tabName="principles" />
              </TabsTrigger>
              <TabsTrigger value="assessment" className="flex items-center justify-center">
                Assessment
                <TabStatus tabName="assessment" />
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="requirements">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Key Requirements</CardTitle>
                  <CardDescription>The heavy vehicle must be loaded following these requirements:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {requirements.map((req, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        {req.icon}
                        <span>{req.text}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="principles">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Safe Loading Principles</CardTitle>
                  <CardDescription>Follow these principles to ensure safe loading:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {principles.map((principle, index) => (
                      <li key={index}>{principle}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assessment">
              <Card className="bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Assess Your Loading</CardTitle>
                  <CardDescription>Ask yourself these questions when evaluating your load:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {assessment.map((question, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <HelpCircle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 p-4 bg-yellow-100 text-yellow-800 rounded-lg flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <p className="text-sm">

              Remember: Poorly loaded vehicles can cause injuries and fatalities. Always follow these guidelines and seek professional advice when needed.
            </p>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {allTabsVisited ? (
                <span className="text-green-500 font-semibold">All sections completed</span>
              ) : (
                <span>Please complete all sections before proceeding</span>
              )}
            </div>
            <Button 
              onClick={handleNextClick} 
              disabled={!allTabsVisited}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <Card className="mt-6 bg-card text-card-foreground">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Knowledge Check</CardTitle>
            <CardDescription>Test your understanding of heavy vehicle loading requirements:</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-semibold mb-4">{quizQuestion.question}</p>
            <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer}>
              {quizQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button onClick={handleSubmit} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              Submit
            </Button>
            {showFeedback && (
              <div className={`mt-4 p-4 rounded ${selectedAnswer === quizQuestion.correctAnswer ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                {selectedAnswer === quizQuestion.correctAnswer ? (
                  <>
                    <CheckCircle2 className="inline-block mr-2 h-5 w-5" />
                    Correct! Well done.
                  </>
                ) : (
                  <>
                    <AlertTriangle className="inline-block mr-2 h-5 w-5" />
                    Incorrect. The correct answer is: "{quizQuestion.correctAnswer}". Review the requirements and try again.
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LoadingRequirementsPoster;