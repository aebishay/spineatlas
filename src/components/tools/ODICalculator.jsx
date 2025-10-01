import { useState } from 'react';
import './ODICalculator.css';

const questions = [
  {
    title: 'Pain Intensity',
    options: [
      'I have no pain at the moment.',
      'The pain is very mild at the moment.',
      'The pain is moderate at the moment.',
      'The pain is fairly severe at the moment.',
      'The pain is very severe at the moment.',
      'The pain is the worst imaginable at the moment.'
    ]
  },
   {
      title: 'Personal Care (Washing, Dressing, etc.)',
      options: [
        'I can look after myself normally without causing extra pain.',
        'I can look after myself normally but it causes extra pain.',
        'It is painful to look after myself and I am slow and careful.',
        'I need some help but manage most of my personal care.',
        'I need help every day in most aspects of self care.',
        'I do not get dressed, wash with difficulty and stay in bed.'
      ]
    },
    {
      title: 'Lifting',
      options: [
        'I can lift heavy weights without extra pain.',
        'I can lift heavy weights but it gives extra pain.',
        'Pain prevents me from lifting heavy weights off the floor.',
        'Pain prevents me from lifting heavy weights but I can manage if they are conveniently positioned.',
        'I can lift only very light weights.',
        'I cannot lift or carry anything at all.'
      ]
    },
    {
      title: 'Walking',
      options: [
        'Pain does not prevent me walking any distance.',
        'Pain prevents me walking more than 1 mile.',
        'Pain prevents me walking more than 0.5 mile.',
        'Pain prevents me walking more than 0.25 mile.',
        'I can only walk using a stick or crutches.',
        'I am in bed most of the time and have to crawl to the toilet.'
      ]
    },
    {
      title: 'Sitting',
      options: [
        'I can sit in any chair as long as I like.',
        'I can sit in my favorite chair as long as I like.',
        'Pain prevents me from sitting for more than 1 hour.',
        'Pain prevents me from sitting for more than 30 minutes.',
        'Pain prevents me from sitting for more than 10 minutes.',
        'Pain prevents me from sitting at all.'
      ]
    },
    {
      title: 'Standing',
      options: [
        'I can stand as long as I want without extra pain.',
        'I can stand as long as I want but it gives me extra pain.',
        'Pain prevents me from standing for more than 1 hour.',
        'Pain prevents me from standing for more than 30 minutes.',
        'Pain prevents me from standing for more than 10 minutes.',
        'Pain prevents me from standing at all.'
      ]
    },
    {
      title: 'Sleeping',
      options: [
        'My sleep is never disturbed by pain.',
        'My sleep is occasionally disturbed by pain.',
        'Because of pain, I have less than 6 hours sleep.',
        'Because of pain, I have less than 4 hours sleep.',
        'Because of pain, I have less than 2 hours sleep.',
        'Pain prevents me from sleeping at all.'
      ]
    },
    {
      title: 'Sex Life (if applicable)',
      options: [
        'My sex life is normal and causes no extra pain.',
        'My sex life is normal but causes some extra pain.',
        'My sex life is nearly normal but is very painful.',
        'My sex life is severely restricted by pain.',
        'My sex life is nearly absent because of pain.',
        'Pain prevents any sex life at all.'
      ]
    },
    {
      title: 'Social Life',
      options: [
        'My social life is normal and gives me no extra pain.',
        'My social life is normal but increases the degree of pain.',
        'Pain has no significant effect on my social life apart from limiting energetic interests.',
        'Pain has restricted my social life and I do not go out as often.',
        'Pain has restricted my social life to my home.',
        'I have no social life because of pain.'
      ]
    },
    {
      title: 'Traveling',
      options: [
        'I can travel anywhere without extra pain.',
        'I can travel anywhere but it gives me extra pain.',
        'Pain restricts me to short necessary journeys under 30 minutes.',
        'Pain restricts me to very short necessary journeys under 10 minutes.',
        'Pain prevents me from traveling except to the doctor/hospital.',
        'Pain prevents me from traveling at all.'
      ]
    }
  ];

function ODICalculator() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const totalAnswered = answers.filter((a) => a !== null).length;
  const totalScore = answers.reduce((sum, val) => sum + (val !== null ? val : 0), 0);
  const percentage = totalAnswered > 0 ? Math.round((totalScore / (totalAnswered * 5)) * 100) : 0;

  let interpretation = '';
  if (percentage <= 20) interpretation = 'Minimal disability';
  else if (percentage <= 40) interpretation = 'Moderate disability';
  else if (percentage <= 60) interpretation = 'Severe disability';
  else if (percentage <= 80) interpretation = 'Crippled';
  else interpretation = 'Bed-bound or exaggerating symptoms';

  const handleSelect = (questionIndex, optionIndex) => {
    const updated = [...answers];
    updated[questionIndex] = optionIndex;
    setAnswers(updated);
  };

  return (
    <section className="odi-section">
      <div className="odi-container">
        <h2>Oswestry Disability Index</h2>
        <p className="subtitle">Standardized tool to quantify disability from low back pain</p>

        {questions.map((q, i) => (
          <div className="odi-block" key={i}>
            <h3>{q.title}</h3>
            <div className="odi-options-wrapper">
              {q.options.map((text, idx) => (
                <div
                  key={idx}
                  className={`odi-option ${answers[i] === idx ? 'active' : ''}`}
                  onClick={() => handleSelect(i, idx)}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="odi-summary">
          <h3>Score: {percentage}%</h3>
          <p>{interpretation}</p>
        </div>
      </div>
    </section>
  );
}

export default ODICalculator;