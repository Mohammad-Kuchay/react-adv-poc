export const fetchCharacterList = async (pageNo:string) => {
    try {
      const response = await fetch(
        `https://www.anapioficeandfire.com/api/characters?page=${pageNo}&pageSize=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch character list.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("An error occurred while fetching character list.");
    }
  };
  
  export const fetchCharacterDetails = async (id: string) => {
    try {
      const response = await fetch(id);
      if (!response.ok) {
        throw new Error("Failed to fetch character details.");
      }
      const data = await response.json();
      const books = await fetchBooks(data.books);
      data.books = books
      return data;
    } catch (error) {
      throw new Error("An error occurred while fetching character details.");
    }
  };

  const fetchBooks = async (urls: string[]) => {
    try {
      const names = [];
  
      for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error("Failed to fetch book details.");
        }
  
        const data = await response.json();
        names.push(data.name);
      }
  
      return names;
    } catch (error) {
      throw new Error("An error occurred while fetching books.");
    }
  };
  
  