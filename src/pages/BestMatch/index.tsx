import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";

const CharacterDetailPage = () => {
  const [activeTab, setActiveTab] = useState("powerstats");
  const character = useSelector(
    (state: RootState) => state.questionsSlice.bestMatch
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!character) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [character, navigate]);

  if (!character) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold">
          No character found, Redirecting you to the home page
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-row  items-center min-h-screen bg-gray-900 text-white ">
      <div className="w-2/4 p-6 flex justify-center items-center">
        <img
          src={character.image.url}
          alt={character.name}
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="w-1/4 m-6 flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">{character.name}</h1>
        <div className="flex flex-row flex-wrap mb-4">
          {["powerstats", "biography", "appearance", "connections"].map(
            (tab) => (
              <button
                key={tab}
                className={`py-2 px-4 ${
                  activeTab === tab
                    ? "border-b-2 text-blue-600 dark:text-blue-500"
                    : ""
                }`}
                onClick={() => setActiveTab(tab)}
                style={{ minWidth: "6rem" }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        <div className="border-t border-gray-700 pt-4 min-h-[300px]">
          {activeTab === "powerstats" && (
            <div>
              {Object.entries(character.powerstats).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span>{typeof value === "string" ? value : " "}%</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "biography" && (
            <div>
              {Object.entries(character.biography).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span>
                    {typeof value === "string"
                      ? value
                      : Array.isArray(value)
                      ? value.join(", ")
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          )}
          {activeTab === "appearance" && (
            <div>
              {Object.entries(character.appearance).map(([key, value]) => (
                <div key={key} className="flex justify-between mb-2">
                  <span className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <span>
                    {typeof value === "string"
                      ? value
                      : Array.isArray(value)
                      ? value.join(", ")
                      : ""}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "connections" && (
            <div>
              {Object.entries(character.connections).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <h3 className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h3>
                  <p className="p-4">
                    {typeof value === "string"
                      ? value
                      : Array.isArray(value)
                      ? value.join(", ")
                      : ""}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;
