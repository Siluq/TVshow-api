import { shallowMount } from "@vue/test-utils";
import ShowDashboard from "@/components/ShowDashboard.vue";

describe("ShowDashboard", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ShowDashboard, {
      data() {
        return {
          shows: [
            {
              id: 1,
              name: "Breaking Bad",
              genres: ["Drama", "Crime"],
              rating: { average: 9.5 },
              image: { medium: "https://example.com/image.png" },
            },
            {
              id: 2,
              name: "Stranger Things",
              genres: ["Drama", "Horror"],
              rating: { average: 8.2 },
              image: { medium: "https://example.com/image.png" },
            },
          ],
          searchQuery: "",
          selectedGenre: "",
          selectedRating: "",
          selectedSort: "",
          options: [
            { text: "1+", value: 1 },
            { text: "2+", value: 2 },
            { text: "3+", value: 3 },
            { text: "4+", value: 4 },
            { text: "5+", value: 5 },
            { text: "6+", value: 6 },
            { text: "7+", value: 7 },
            { text: "8+", value: 8 },
            { text: "9+", value: 9 },
            { text: "10", value: 10 },
          ],
        };
      },
    });
  });

  it("should render show cards for all shows in the shows array", () => {
    const showCards = wrapper.findAll(".show-card");
    expect(showCards.length).toBe(2);
  });

  it("should render show cards with correct information for each show", () => {
    const showCards = wrapper.findAll(".show-card");
    const firstShow = wrapper.vm.shows[0];
    const secondShow = wrapper.vm.shows[1];

    expect(showCards.at(0).find(".show-card-title").text()).toBe(
      firstShow.name
    );
    expect(showCards.at(0).find(".show-card-genres").text()).toBe(
      `Genres: ${firstShow.genres.join(", ")}`
    );
    expect(showCards.at(0).find(".show-card-rating").text()).toBe(
      `Rating: ${firstShow.rating.average}`
    );
    expect(showCards.at(0).find("img").attributes("src")).toBe(
      firstShow.image.medium
    );

    expect(showCards.at(1).find(".show-card-title").text()).toBe(
      secondShow.name
    );
    expect(showCards.at(1).find(".show-card-genres").text()).toBe(
      `Genres: ${secondShow.genres.join(", ")}`
    );
    expect(showCards.at(1).find(".show-card-rating").text()).toBe(
      `Rating: ${secondShow.rating.average}`
    );
    expect(showCards.at(1).find("img").attributes("src")).toBe(
      secondShow.image.medium
    );
  });

  it("should update filteredShows computed property when selectedGenre changes", async () => {
    const selectGenre = wrapper.find("#genre-filter");
    selectGenre.setValue("Drama");
    await wrapper.vm.$nextTick();

    const filteredShows = wrapper.vm.filteredShows;
    expect(filteredShows.length).toBe(2);
  });

  it("should update filteredShows computed property when selectedRating changes", async () => {
    const selectRating = wrapper.find("#rating-filter");
    selectRating.setValue(9);
    await wrapper.vm.$nextTick();

    const filteredShows = wrapper.vm.filteredShows;
    expect(filteredShows.length).toBe(1);
  });
});
