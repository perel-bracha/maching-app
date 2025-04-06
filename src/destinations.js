const total = 200000;
const apartSmall = 3000;
const apartMedium = 8000;
const apartBig = 12000;
const girlSmall = 500;
const girlMedium = 1000;
const girlBig = 2000;

export function getPercent(to, amount) {
  switch (to) {
    case "total":
      return { percent: Math.floor((amount / total) * 100), target: "יציאה" };
    case "apart":
      if (amount < apartSmall)
        return {
          percent: Math.floor((amount / apartSmall) * 100),
          target: "/piza.png",
          have: [],
        };
      if (amount < apartMedium)
        return {
          percent: Math.floor((amount / apartMedium) * 100),
          target: "/micro.png",
          have: ["/piza.png"],
        };
      if (amount < apartBig)
        return {
          percent: Math.floor((amount / apartBig) * 100),
          target: "/minibar.png",
          have: ["/piza.png", "/micro.png"],
        };
      return {
        percent: Math.floor((amount / apartBig) * 100),
        have: ["/piza.png", "/micro.png", "/minibar.png"],
      };
    case "girl":
      if (amount < girlSmall)
        return {
          percent: Math.floor((amount / girlSmall) * 100),
          target: "/pel.png",
          have: [],
        };
      if (amount < girlMedium)
        return {
          percent: Math.floor((amount / girlMedium) * 100),
          target: "/smell.png",
          have: ['/pel.png'],
        };
      if (amount < girlBig)
        return {
          percent: Math.floor((amount / girlBig) * 100),
          target: "/set.png",
          have: ['/pel.png', '/smell.png'],
        };
      return { percent: Math.floor((amount / girlBig) * 100), have: ['/pel.png', '/smell.png', '/set.png'] };
  }
}
