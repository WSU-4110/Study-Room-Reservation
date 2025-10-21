import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";

const universities = [
  "Wayne State University",
  "University of Illinois Urbana-Champaign",
  "Northwestern University",
  "University of Chicago",
  "Illinois State University",
];

const SelectUniversity = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredUniversities = universities.filter(uni =>
    uni.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedUniversity) {
      localStorage.setItem("selectedUniversity", selectedUniversity);
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#5DBAAA] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto">
            <BookOpen className="w-10 h-10 text-[#5DBAAA]" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-white">StudyRez</h1>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white text-center">
            Select your school
          </h2>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex items-center px-4 py-3 border-b border-gray-200">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <Input
                  type="text"
                  placeholder="Search schools"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                />
              </div>
              
              {isDropdownOpen && (
                <div className="max-h-48 overflow-y-auto bg-white">
                  {filteredUniversities.map((university) => (
                    <button
                      key={university}
                      onClick={() => {
                        setSelectedUniversity(university);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                        selectedUniversity === university ? "bg-blue-50" : ""
                      }`}
                    >
                      <span className="text-gray-700">{university}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <Button
            onClick={handleContinue}
            disabled={!selectedUniversity}
            className="w-full bg-[#2C3E50] hover:bg-[#2C3E50]/90 text-white h-12 rounded-full text-base font-medium disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectUniversity;
