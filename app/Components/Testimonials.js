export default function Testimonials() {
  const testimonials = [
    {
      name: "Emily Carter",
      avatar: "https://ui-avatars.com/api/?name=Emily+Carter&background=random",
      text: "This platform is a game-changer. It saved me hours of paperwork and made contract generation seamless. As someone who deals with clients daily, it's now an essential part of my workflow.",
    },
    {
      name: "Omar Khalid",
      avatar: "https://ui-avatars.com/api/?name=Omar+Khalid&background=random",
      text: "Super intuitive interface, everything just works — especially the contract templates. Total lifesaver for fast-paced projects.",
    },
    {
      name: "Sophia Lin",
      avatar: "https://ui-avatars.com/api/?name=Sophia+Lin&background=random",
      text: "It’s professional, simple to use, and actually looks good. I sent off a proposal in minutes and got a positive client response within the hour.",
    },
    {
      name: "Marcus Wright",
      avatar: "https://ui-avatars.com/api/?name=Marcus+Wright&background=random",
      text: "We use this app to handle our freelancer agreements, NDAs, and service contracts — and it hasn't let us down.",
    },
    {
      name: "Nadia Rahman",
      avatar: "https://ui-avatars.com/api/?name=Nadia+Rahman&background=random",
      text: "This tool has streamlined how I work with brands. I love how easy it is to create clean, professional contracts without hiring a lawyer.",
    },
    {
      name: "Jonathan Myers",
      avatar: "https://ui-avatars.com/api/?name=Jonathan+Myers&background=random",
      text: "I no longer worry about unclear terms or chasing payments. Having ready-to-go legal templates means I can focus more on my shoots and less on admin.",
    },
  ];

  return (
    <div className="md:max-w-[70%] w-[90%] mx-auto px-4 py-24">
      <h2 className="lg:text-5xl text-3xl text-[#5d17eb] font-bold text-center mb-12">What Our Clients Say</h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 grid-auto-rows">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg shadow-purple-100 rounded-2xl flex flex-col gap-4"
          >
            <div className="flex items-center gap-4">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            </div>
            <p className="text-gray-600">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
