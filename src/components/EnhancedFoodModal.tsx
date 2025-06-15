import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus, Camera, Mic, Search, Utensils } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FoodSearchModal from "./FoodSearchModal";
import SavedMealsManager from "./SavedMealsManager";

interface EnhancedFoodModalProps {
  onClose: () => void;
  initialMode?: "search" | "saved" | "barcode" | "voice" | "mealBuilder";
}

export default function EnhancedFoodModal({ onClose, initialMode = "search" }: EnhancedFoodModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"search" | "saved" | "barcode" | "voice">(
    initialMode === "mealBuilder" ? "search" : initialMode
  );
  const [isScanning, setIsScanning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSavedMeals, setShowSavedMeals] = useState(false);

  const handleBarcodeStart = () => {
    setIsScanning(true);
    toast({
      title: "Barcode Scanner",
      description: "Camera access would be requested here",
    });
    setTimeout(() => {
      setIsScanning(false);
      toast({
        title: "Barcode Scanned",
        description: "Product found: Quest Protein Bar",
      });
    }, 2000);
  };

  const handleVoiceStart = () => {
    setIsRecording(true);
    toast({
      title: "Voice Recording",
      description: "Microphone access would be requested here",
    });
    setTimeout(() => {
      setIsRecording(false);
      toast({
        title: "Voice Processed",
        description: "Food logged from voice note",
      });
    }, 3000);
  };

  const handleSearchClick = () => {
    setShowSearchModal(true);
  };

  const handleSavedMealsClick = () => {
    setShowSavedMeals(true);
  };

  const handleLogSavedMeal = (meal: any, category: string) => {
    // In a real app, this would log the meal to the user's diary
    console.log("Logging saved meal:", meal, "to", category);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {initialMode === "mealBuilder" ? "Create Saved Meal" : "Track Food"}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {initialMode === "mealBuilder" ? (
              // Direct to meal builder mode
              <div className="space-y-4 text-center">
                <div className="p-8 bg-gray-50 rounded-lg">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Build your saved meal by searching and selecting multiple foods</p>
                  <button
                    onClick={handleSearchClick}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Start Building Meal
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("search")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "search" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Search size={16} />
                    Search
                  </button>
                  <button
                    onClick={() => setActiveTab("saved")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "saved" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Utensils size={16} />
                    Saved Meals
                  </button>
                  <button
                    onClick={() => setActiveTab("barcode")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "barcode" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Camera size={16} />
                    Scan
                  </button>
                  <button
                    onClick={() => setActiveTab("voice")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                      activeTab === "voice" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Mic size={16} />
                    Voice
                  </button>
                </div>

                {/* Search Tab */}
                {activeTab === "search" && (
                  <div className="space-y-4 text-center">
                    <div className="p-8 bg-gray-50 rounded-lg">
                      <Search size={48} className="mx-auto text-gray-400 mb-4" />
                      <button
                        onClick={handleSearchClick}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Search Food Database
                      </button>
                      <p className="text-sm text-gray-600 mt-2">Find foods and build custom meals</p>
                    </div>
                  </div>
                )}

                {/* Saved Meals Tab */}
                {activeTab === "saved" && (
                  <div className="space-y-4 text-center">
                    <div className="p-8 bg-gray-50 rounded-lg">
                      <Utensils size={48} className="mx-auto text-gray-400 mb-4" />
                      <button
                        onClick={handleSavedMealsClick}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        View Saved Meals
                      </button>
                      <p className="text-sm text-gray-600 mt-2">Quick log your favorite meals</p>
                    </div>
                  </div>
                )}

                {/* Barcode Tab */}
                {activeTab === "barcode" && (
                  <div className="space-y-4 text-center">
                    <div className="p-8 bg-gray-50 rounded-lg">
                      {isScanning ? (
                        <div>
                          <div className="animate-pulse">📱 Scanning...</div>
                          <p className="text-sm text-gray-600 mt-2">Point camera at barcode</p>
                        </div>
                      ) : (
                        <div>
                          <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                          <button
                            onClick={handleBarcodeStart}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Start Scanning
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Voice Tab */}
                {activeTab === "voice" && (
                  <div className="space-y-4 text-center">
                    <div className="p-8 bg-gray-50 rounded-lg">
                      {isRecording ? (
                        <div>
                          <div className="animate-pulse text-red-500">🎤 Recording...</div>
                          <p className="text-sm text-gray-600 mt-2">Describe what you ate</p>
                        </div>
                      ) : (
                        <div>
                          <Mic size={48} className="mx-auto text-gray-400 mb-4" />
                          <button
                            onClick={handleVoiceStart}
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Start Recording
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </div>

      {showSearchModal && (
        <FoodSearchModal 
          onClose={() => setShowSearchModal(false)} 
          mode={initialMode === "mealBuilder" ? "mealBuilder" : "normal"}
        />
      )}

      {showSavedMeals && (
        <SavedMealsManager 
          onClose={() => setShowSavedMeals(false)}
          onLogMeal={handleLogSavedMeal}
        />
      )}
    </>
  );
}
