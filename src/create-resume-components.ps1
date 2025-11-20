
# رفتن به مسیر src پروژه (تغییر بده اگر پروژه‌ات جای دیگه‌ست)
cd "$PSScriptRoot"

# ساخت فایل HeaderSection.jsx
Set-Content -Path .\HeaderSection.jsx -Value @"
export default function HeaderSection() {
  return (
    <header className='text-center mt-10 mb-8'>
      <h1 className='text-4xl font-extrabold text-gray-900'>Ali Mansouri</h1>
      <p className='mt-2 text-xl text-gray-700'>
        People Analytics & Digital HR Specialist | PhD Candidate in Futures Studies
      </p>
      <p className='mt-1 text-md text-gray-600'>
        Expertise in HR Tech, BI, Strategic Foresight & Data-driven HR Innovation
      </p>
    </header>
  );
}
"@

# ساخت فایل ContactSection.jsx
Set-Content -Path .\ContactSection.jsx -Value @"
import { Mail, Linkedin, Github, BookOpen, Search } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className='p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Contact Me</h2>
      <ul className='space-y-3'>
        <li className='flex items-center gap-3'>
          <Mail className='w-5 h-5' />
          <a href='mailto:ali.mansouri1998@gmail.com' className='text-blue-600 hover:underline'>
            ali.mansouri1998@gmail.com
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <Linkedin className='w-5 h-5' />
          <a href='https://www.linkedin.com/in/ali-mansouri-a7984215b/' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
            LinkedIn Profile
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <Github className='w-5 h-5' />
          <a href='https://github.com/ali-m07' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
            GitHub Profile
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <BookOpen className='w-5 h-5' />
          <a href='https://www.researchgate.net/profile/Ali-Mansouri-44' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
            ResearchGate
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <Search className='w-5 h-5' />
          <a href='https://scholar.google.com/citations?user=YOUR_GOOGLE_SCHOLAR_ID' target='_blank' rel='noopener noreferrer' className='text-blue-600 hover:underline'>
            Google Scholar
          </a>
        </li>
      </ul>
    </section>
  );
}
"@

# ساخت فایل ExperienceSection.jsx
Set-Content -Path .\ExperienceSection.jsx -Value @"
export default function ExperienceSection() {
  return (
    <section className='p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10'>
      <h2 className='text-2xl font-bold mb-4'>Professional Experience</h2>
      <ul className='space-y-4 text-gray-700'>

        <li>
          <h3 className='font-semibold text-lg'>Snapp! – Systems & Automation Specialist</h3>
          <p className='text-sm text-gray-500'>Tehran, Iran | Jun 2023 – Present</p>
          <ul className='list-disc list-inside ml-4 mt-1'>
            <li>Built data warehouse and automated HR workflows (cycle time ↓ 40%)</li>
            <li>Developed dashboards to monitor turnover and engagement trends</li>
            <li>Analyzed Gallup Q12 and AON data (employee engagement ↑ 5%)</li>
            <li>Aligned promotion data with business goals</li>
          </ul>
        </li>

        <li>
          <h3 className='font-semibold text-lg'>Bodyspinner – People Analytics Specialist (Part-Time)</h3>
          <p className='text-sm text-gray-500'>Tehran, Iran | Nov 2022 – Sep 2023</p>
          <ul className='list-disc list-inside ml-4 mt-1'>
            <li>Designed HR dashboards (reporting effort ↓ 40%, adoption ↑ 15%)</li>
            <li>Improved HR metric accuracy by 25% through analytics audits</li>
            <li>Co-developed HRIS and custom ticketing system (uptime 99%)</li>
          </ul>
        </li>

        <li>
          <h3 className='font-semibold text-lg'>Shahrzad – HR Digital Transformation Specialist</h3>
          <p className='text-sm text-gray-500'>Tehran, Iran | Dec 2021 – Dec 2022</p>
          <ul className='list-disc list-inside ml-4 mt-1'>
            <li>Reengineered recruitment, onboarding, and evaluation frameworks</li>
            <li>Improved employee productivity (+25%) and reduced time-to-hire (-20%)</li>
            <li>Enhanced role clarity through OKRs, KPIs, and organizational diagnostics</li>
          </ul>
        </li>

      </ul>
    </section>
  );
}
"@
