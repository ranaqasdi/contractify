export default function Testimonials() {
    const testimonials = [
      {
        name: "John Doe",
        text: "This service was amazing! Highly recommended.This service was amazing! Highly recommended.This service was amazing! Highly recommended.",
        avatar: "https://i.pravatar.cc/100?img=1",
      },
      {
        name: "Jane Smith",
        text: "This service was amazing! Highly recommended.This service was amazing! Highly recommended.This service was amazing! Highly recommended.",
        avatar: "https://i.pravatar.cc/100?img=2",
      },
      {
        name: "Michael Brown",
        text: "This service was amazing! Highly recommended.This service was amazing! Highly recommended.This service was amazing! Highly recommended.",
        avatar: "https://i.pravatar.cc/100?img=3",
      },
      {
        name: "Emily Johnson",
        text: "This service was amazing! Highly recommended.This service was amazing! Highly recommended.This service was amazing! Highly recommended.",
        avatar: "https://i.pravatar.cc/100?img=4",
      },
      {
        name: "David Wilson",
        text: "This service was amazing! Highly recommended.This service was amazing! Highly recommended.This service was amazing! Highly recommended.",
        avatar: "https://i.pravatar.cc/100?img=5",
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
  