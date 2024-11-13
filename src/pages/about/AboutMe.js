import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext.js';
import { Github, Linkedin, Mail, ExternalLink, Terminal, Code, Palette, Music, Camera, Coffee, Calendar, Clock, Tag, MessageSquare, Snow, Snowflake, Sun } from 'lucide-react';
import profileBackgroundImage from '../../img/backgounrd_profile.png';
import SnowWrapper from '../../components/SnowEffect.js';

const AboutMePage = (  ) => {
  const { isEnglish } = useLanguage();
  const [activeSection, setActiveSection] = useState('profile');
  //const [isEnglish, setIsEnglish] = useState(true); // Share this state with Header component
  const [showSnow, setShowSnow] = useState(true);
  const sections = {
    profile: {
      title: "Profile",
      icon: <Terminal size={24} />,
      content: "Your main introduction goes here"
    },
    skills: {
      title: "Skills",
      icon: <Code size={24} />,
      content: "Your skills details"
    },
    interests: {
      title: "Interests",
      icon: <Palette size={24} />,
      content: "Your interests and hobbies"
    }
  };

  return (
    <SnowWrapper isEnabled={showSnow}>
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Main Container */}
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 bg-white">
            {/* Decorative Elements */}
            <img 
                  src={profileBackgroundImage}
                  alt="Your Name" 
                  className="relative h-64 rounded-2xl object-cover"
                />
            <div className="absolute inset-0 opacity-20">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute transform rotate-45 bg-white/10"
                  style={{
                    width: '120px',
                    height: '120px',
                    left: `${i * 200}px`,
                    top: `${(i % 2) * 100 - 50}px`
                  }}
                />
              ))}
            </div>
            
            {/* Profile Image */}
            <div className="absolute -bottom-16 left-8 md:left-12">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white">
                {/* Replace with your image */}
                <img 
                  src="https://avatars.githubusercontent.com/u/97029997?v=4"
                  alt="Your Name" 
                  className="w-full h-full rounded-full border-4 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-20 pb-8 px-8 md:px-12">
            <h1 className="text-3xl font-bold text-gray-900">{isEnglish ? "Dongho Lee" : "이동호"}</h1>
            <p className="text-lg text-gray-600 mt-2">{isEnglish?"Hello, my name is Dongho Lee from South Korea. I'm studying AI Engineering.":"안녕하세요. 저는 이동호입니다. AI 엔지니어링을 공부하고 있습니다."} 
              <br></br>{isEnglish?"I wanna be a very powerful AI Engineer and Super Rich.":"저는 멋진 풀스택 AI 엔지니어가 되고자 합니다."} 
              <br></br>{isEnglish?"Welcome to my first homepage. You can find my portfolio about my projects.":"이 곳은 저의 첫 번째 홈페이지입니다. 저의 포트폴리오를 보실 수 있습니다."} 
              <br></br>{isEnglish?"And also you can find my reviews about everything what I have interested in.":"그리고, 제가 관심있는 것들에 대한 리뷰를 쓸 예정입니다."} 
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="https://www.github.com/Horidong" target="_blank" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="https:///www.linkedin.com/in/kod9326/" target="_blank" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:kod9326@gmail.com" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Navigation Cards */}
          <div className="space-y-4">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-center space-x-3
                  ${activeSection === key 
                    ? 'bg-white shadow-lg scale-105 text-blue-600' 
                    : 'bg-gray-100 hover:bg-white hover:shadow-md text-gray-600'}`}
              >
                <span className="p-2 rounded-lg bg-gray-100">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-8">
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Hello, World! 👋</h2>
                <p className="text-gray-600 leading-relaxed">
                  Write your introduction here. Make it personal and engaging.
                  Share your journey, passion, and what drives you.
                </p>
                
                {/* Quick Facts */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-gray-50">
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Your Location</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50">
                    <h3 className="font-medium text-gray-900">Experience</h3>
                    <p className="text-gray-600">X Years</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
                <div className="grid grid-cols-2 gap-4">
                  {['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'].map((skill, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-50">
                      <div className="h-2 bg-blue-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full"
                          style={{ width: `${85 - (index * 10)}%` }}
                        />
                      </div>
                      <p className="mt-2 text-gray-600">{skill}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'interests' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">What I Love</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: <Code size={24} />, label: "Coding" },
                    { icon: <Music size={24} />, label: "Music" },
                    { icon: <Camera size={24} />, label: "Photography" },
                    { icon: <Coffee size={24} />, label: "Coffee" },
                    { icon: <Palette size={24} />, label: "Art" },
                  ].map((interest, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-50 flex flex-col items-center text-center">
                      <span className="text-blue-600 mb-2">{interest.icon}</span>
                      <span className="text-gray-600">{interest.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </SnowWrapper>
  );
};

export default AboutMePage;