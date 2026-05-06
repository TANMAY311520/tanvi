export const loveConfig = {
  names: {
    tanmay: "Tanmay",
    vidhi: "Vidhi",
  },
  appName: "Tanvi",
  startDate: "2020-12-23",

  foods: [
    { item: "Tiramisu", emoji: "🍰", added: true },
    { item: "Pani Puri", emoji: "🫙", added: true },
    { item: "Chocolate Cake", emoji: "🍰", added: true },
    { item: "Momo", emoji: "🥟", added: true },
    { item: "Gelato", emoji: "🍦", added: true },
    { item: "Espresso", emoji: "☕", added: true },
    { item: "Strawberry Cheesecake", emoji: "🍓", added: true },
    { item: "Sushi", emoji: "🍣", added: true },
  ],

  places: [
    { name: "Mumbai", emoji: "🇮🇳", visited: true, note: "Where it all began" },
    { name: "Paris", emoji: "🇫🇷", visited: false, note: "Dream destination" },
    { name: "Tokyo", emoji: "🇯🇵", visited: false, note: "Love & adventure" },
    { name: "Bali", emoji: "🌴", visited: false, note: "Romantic getaway" },
    { name: "Goa", emoji: "🏖️", visited: true, note: "First trip together" },
    { name: "Kashmir", emoji: "❄️", visited: false, note: "Snowy dreams" },
  ],

  dreams: [
    { icon: "✈️", text: "Visit Paris together", status: "dreaming" as const },
    { icon: "💍", text: "Get matching jewelry", status: "dreaming" as const },
    { icon: "🐱", text: "Adopt a cat together", status: "dreaming" as const },
    {
      icon: "🌅",
      text: "Watch sunrise from a hilltop",
      status: "dreaming" as const,
    },
    {
      icon: "👨‍🍳",
      text: "Cook a full meal together",
      status: "dreaming" as const,
    },
    { icon: "🏠", text: "Build our dream home", status: "dreaming" as const },
  ] as const,

  specialMoments: [
    {
      title: "Our Love Story Begins",
      date: "2020-12-23",
      description:
        "The day that changed everything. Where two hearts became one.",
      icon: "💫",
    },
    {
      title: "First Kiss",
      date: "2021-02-14",
      description: "Under the stars, a moment frozen in time forever.",
      icon: "💋",
    },
    {
      title: "First Trip",
      date: "2021-06-20",
      description: "Creating memories we'll cherish forever.",
      icon: "✈️",
    },
    {
      title: "Forever Together",
      date: "2022-12-23",
      description: "2 years of love, laughter, and endless joy.",
      icon: "🎉",
    },
  ],

  letters: [
    {
      title: "To Vidhi, The Girl Who Makes Everything Better",
      body: `Dear Vidhi,

I wanted to take a moment to tell you something I sometimes forget to say out loud - you make everything better. Everything.

Waking up knowing I get to see your smile. The way you laugh at my terrible jokes. How you hold my hand when I'm worried. The little things you do that show you care.

You are my favorite person in this world, and I love you more than words could ever express.

Forever yours,
Tanmay`,
    },
    {
      title: "Things I Love About You",
      body: `Dearest Vidhi,

This list could go on forever, but here are just some things:

• The way your eyes light up when you're excited
• Your infectious laugh
• Your kindness to everyone around you
• How you support my dreams
• Your strength when things get tough
• The love you show so openly
• Our inside jokes
• The way you make me feel like I'm home

I could write a thousand letters and still not cover everything beautiful about you.

All my love,
Tanmay`,
    },
    {
      title: "For The Nights You Feel Alone",
      body: `My Love,

On the nights when everything feels too much, I want you to remember:

You are never truly alone. Even when we're apart, my heart is with you. You are stronger than you think, braver than you believe, and more loved than you could ever imagine.

When the world feels heavy, remember that I'm here. I'm always here for you. Your dreams matter. Your feelings matter. YOU matter.

And most importantly, remember that we're in this together. Always.

Yours forever,
Tanmay`,
    },
  ],

  surprisePassword: "vidhi",
  surpriseMessage:
    "You are my everything, Vidhi. Every single day with you is a gift. 💜 You make my world brighter, my heart fuller, and my life complete. I love you to the moon and back.",

  musicPlaylist: [
    { title: "Piche Tere", src: "/music/Piche Tere(KoshalWorld.Com).mp3" },
  ],
};
