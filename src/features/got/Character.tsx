import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  fetchCharacterListAsync,
  fetchCharacterDetailsById,
  selectCharacterList,
  selectSelectedCharacter,
  selectLoading,
  selectBooks,
  selectError,
} from "./characterSlice";

const CharacterList: React.FC = () => {
  const dispatch = useAppDispatch();
  const characterList = useAppSelector(selectCharacterList);
  const selectedCharacter = useAppSelector(selectSelectedCharacter);
  const loading = useAppSelector(selectLoading);
  const books = useAppSelector(selectBooks);
  const error = useAppSelector(selectError);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCharacterListAsync(String(currentPage)));
  }, [dispatch, currentPage]);

  const handleCharacterClick = (id: string) => {
    dispatch(fetchCharacterDetailsById(id));
    setSelectedItem(id);
  };

  const renderBooks = () => {
    if (books.length > 0) {
      const bookElements = books.map((book, index) => {
        return <p key={index}>{book}</p>;
      });
      return bookElements;
    } else {
      return <div>Loading books...</div>;
    }
  };

  const renderCharacterDetail = () => {
    if (!selectedCharacter) {
      if (loading) {
        return <div>Loading character data...</div>;
      } else {
        return <div>Select a character to get details</div>;
      }
    } else {
      return (
        <div>
          <span className="font-bold">Name: </span>
          <p>{selectedCharacter.name ? selectedCharacter.name : "Not available"}</p>
          <span className="font-bold">Aliases: </span>
          <p>
            {selectedCharacter.aliases ? selectedCharacter.aliases[0] : "Not available"}
          </p>
          <span className="font-bold">Gender: </span>
          <p>{selectedCharacter.gender ? selectedCharacter.gender : "Not available"}</p>
          <span className="font-bold">Culture: </span>
          <p>{selectedCharacter.culture ? selectedCharacter.culture : "Not available"}</p>
          <p>
            <span className="font-bold">Born: </span>
            {selectedCharacter.born ? selectedCharacter.born : "Not available"}
          </p>
          <p>
            <span className="font-bold">Died: </span>
            {selectedCharacter.died ? selectedCharacter.died : "Not available"}
          </p>
          <div>
            <span className="font-bold">Books: </span>
            {renderBooks()}
          </div>
        </div>
      );
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-4 overflow-y-auto max-h-screen bg-gray-200">
        <div className="grid gap-4">
          {characterList.map((item, index) => (
            <div
              className={`p-4 border rounded cursor-pointer hover:bg-blue-200 ${
                selectedItem === item.url ? "bg-blue-500" : ""
              }`}
              key={index}
              onClick={() => handleCharacterClick(item.url)}
            >
              <div>
                <p className="text-blue-500 font-bold">{item.name ? item.name : "------"}</p>
                <p>{item.aliases[0] ? item.aliases[0] : "------"}</p>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="text-red-500">Error: {error}</div>}
        <div className="flex justify-between mt-4 sticky bottom-0 bg-gray-200">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={goToNextPage}
          >
            Next
          </button>
        </div>
      </div>
      <div className="w-2/3 p-4">
        <div className="h-full bg-gray-100">{renderCharacterDetail()}</div>
      </div>
    </div>
  );
};

export default CharacterList;
