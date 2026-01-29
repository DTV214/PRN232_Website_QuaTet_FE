import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactInfoMap() {
  const contactDetails = [
    {
      icon: <MapPin className="text-tet-accent" />,
      title: "Địa Chỉ",
      content: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh, Việt Nam",
      cite: "",
    },
    {
      icon: <Phone className="text-tet-accent" />,
      title: "Hotline",
      content: "1900 xxxx (8:00 - 22:00) / 0901 234 567",
      cite: "",
    },
    {
      icon: <Mail className="text-tet-accent" />,
      title: "Email",
      content: "info@tetgifts.vn / support@tetgifts.vn",
      cite: "",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* 1. Bên trái: Bản đồ (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 h-[450px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-[#FBF5E8]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.46023242832!2d106.69806691462259!3d10.774482892323085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f47306428d5%3A0x96e777711c139460!2zMTIzIMSQxrDhu51uZyBMw6ogTOG7o2ksIELhuruIE5naMOpLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1674523263000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>

          {/* 2. Bên phải: Thông tin & Giờ làm việc */}
          <div className="w-full lg:w-1/2 space-y-12">
            <div className="grid gap-8">
              {contactDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-5 p-6 bg-[#FBF5E8]/30 rounded-3xl border border-tet-secondary/20 hover:shadow-md transition-shadow"
                >
                  <div className="p-4 bg-white rounded-2xl shadow-sm italic">
                    {detail.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-tet-primary text-xl mb-1">
                      {detail.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed italic text-sm md:text-base">
                      {detail.content} {detail.cite}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bảng Giờ làm việc */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-tet-primary p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Clock size={100} />
              </div>
              <h4 className="text-2xl font-serif font-bold mb-6 text-tet-secondary flex items-center gap-3">
                <Clock size={24} /> Giờ Làm Việc
              </h4>
              <div className="space-y-4 text-sm md:text-base border-t border-white/10 pt-6">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-80">Thứ 2 - Thứ 6</span>
                  <span className="font-bold italic">8:00 - 20:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-80">Thứ 7</span>
                  <span className="font-bold italic">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="opacity-80">Chủ Nhật</span>
                  <span className="font-bold italic">9:00 - 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Ngày Lễ, Tết</span>
                  <span className="text-tet-accent font-bold italic underline underline-offset-4">
                    Liên hệ trước
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
