
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus, Camera, Mic, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface EnhancedFoodModalProps {
  onClose: () => void;
}

export default function EnhancedFoodModal({ onClose }: EnhancedFoodModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"search" | "barcode" | "voice">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [foodItems, setFoodItems] = useState([{ name: "", calories: "", protein: "" }]);

  const searchResults = [
    { name: "Chicken Breast (100g)", calories: 165, protein: 31, brand: "Generic" },
    { name: "Banana (medium)", calories: 105, protein: 1, brand: "Fresh" },
    { name: "Greek Yogurt (200g)", calories: 130, protein: 23, brand: "Fage" },
    { name: "Oatmeal (50g dry)", calories: 190, protein: 7, brand: "Quaker" },
  ];

  const handleBarcodeStart = () => {
    setIsScanning(true);
    toast({
      title: "Barcode Scanner",
      description: "Camera access would be requested here",
    });
    // Simulate scan result after 2 seconds
    setTimeout(() => {
      setIsScanning(false);
      setFoodItems([{ name: "Protein Bar - Quest", calories: "200", protein: "21" }]);
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
    // Simulate voice recognition after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setFoodItems([{ name: "Two slices of whole wheat toast with peanut butter", calories: "320", protein: "14" }]);
      toast({
        title: "Voice Processed",
        description: "Food logged from voice note",
      });
    }, 3000);
  };

  const handleSearchSelect = (item: any) => {
    setFoodItems([{ name: item.name, calories: item.calories.toString(), protein: item.protein.toString() }]);
    toast({
      title: "Food Selected",
      description: `${item.name} added to log`,
    });
  };

  const handleSubmit = () => {
    const validItems = foodItems.filter(item => item.name && item.calories);
    if (validItems.length === 0) return;
    
    const totalCalories = validItems.reduce((sum, item) => sum + parseInt(item.calories || "0"), 0);
    const totalProtein = validItems.reduce((sum, item) => sum + parseInt(item.protein || "0"), 0);
    
    toast({
      title: "Food Logged",
      description: `${validItems.length} items logged: ${totalCalories} calories, ${totalProtein}g protein`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Track Food</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab("search")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === "search" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Search size={16} />
              Search
            </button>
            <button
              onClick={() => setActiveTab("barcode")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === "barcode" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Camera size={16} />
              Scan
            </button>
            <button
              onClick={() => setActiveTab("voice")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === "voice" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              <Mic size={16} />
              Voice
            </button>
          </div>

          {/* Search Tab */}
          {activeTab === "search" && (
            <div className="space-y-4">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for food..."
                className="w-full"
              />
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchSelect(item)}
                    className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200"
                  >
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">{item.calories} cal • {item.protein}g protein • {item.brand}</div>
                  </button>
                ))}
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

          {/* Current Food Items */}
          {foodItems.some(item => item.name) && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Food to Log:</h3>
              {foodItems.map((item, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Food Name</label>
                      <Input
                        value={item.name}
                        onChange={(e) => {
                          const updated = foodItems.map((food, i) => 
                            i === index ? { ...food, name: e.target.value } : food
                          );
                          setFoodItems(updated);
                        }}
                        placeholder="Food name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Calories</label>
                      <Input
                        type="number"
                        value={item.calories}
                        onChange={(e) => {
                          const updated = foodItems.map((food, i) => 
                            i === index ? { ...food, calories: e.target.value } : food
                          );
                          setFoodItems(updated);
                        }}
                        placeholder="250"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Protein (g)</label>
                      <Input
                        type="number"
                        value={item.protein}
                        onChange={(e) => {
                          const updated = foodItems.map((food, i) => 
                            i === index ? { ...food, protein: e.target.value } : food
                          );
                          setFoodItems(updated);
                        }}
                        placeholder="25"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={handleSubmit}
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Log Food
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
