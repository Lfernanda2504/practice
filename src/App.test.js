import { render, screen } from '@testing-library/react';
import App from './App';
import data from './data.json';

describe('Star Wars APP', () => {
  //hace que se ejecute antes de todos los tests
  beforeAll(() => jest.spyOn(window, 'fetch'))
  it('should show list of characters from API', async () => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async ()=> data,
    })
    render(<App />);
    //comprueba que el metodo fetch a sido llamendo 1
    expect(window.fetch).toHaveBeenCalledTimes(1);
    // y que se llamo con la url indicada que
    expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/people/');

    for (let character of data.results) {
      expect( await screen.findByText(character.name)).toBeInTheDocument();
    }
  })

  it('should show an error message when has a network error ', async () => {
    window.fetch.mockRejectedValueOnce(new Error('Network error'));
    render(<App />);
    expect(await screen.findByText('network error')).toBeInTheDocument();
    })
  /*
  it('should show list of characters', () => {
    render(<App />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should show list of characters from a JSON file', () => {
    render(<App />);
    //data.results.forEach((character) => {});
    for (let character of data.results) {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    }
  })
  */
  
});
