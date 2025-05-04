import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Github, BookOpen, Search } from 'lucide-react';

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <section className='p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md mt-10'>
      <h2 className='text-2xl font-bold mb-4'>{t('contact.title')}</h2>
      <ul className='space-y-3'>
        <li className='flex items-center gap-3'>
          <Mail className='w-5 h-5' />
          <a href='mailto:ali.mansouri1998@gmail.com' className='text-blue-600 hover:underline'>
            ali.mansouri1998@gmail.com
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <Linkedin className='w-5 h-5' />
          <a
            href='https://www.linkedin.com/in/ali-mansouri-a7984215b/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            {t('contact.linkedin')}
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <Github className='w-5 h-5' />
          <a
            href='https://github.com/ali-m07'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            {t('contact.github')}
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <BookOpen className='w-5 h-5' />
          <a
            href='https://www.researchgate.net/profile/Ali-Mansouri-44'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            {t('contact.researchgate')}
          </a>
        </li>
        <li className='flex items-center gap-3'>
          <Search className='w-5 h-5' />
          <a
            href='https://scholar.google.com/citations?user=YOUR_GOOGLE_SCHOLAR_ID'
            target='_blank'
            rel='noopener noreferrer'
            className='text-blue-600 hover:underline'
          >
            {t('contact.scholar')}
          </a>
        </li>
      </ul>
    </section>
  );
}
