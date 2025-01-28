'use client'
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  company_culture: string;
  diversity_types: string[];
  benefits: string[];
  type: string;
}

// Add new component for voice assistant button
const VoiceAssistantButton = () => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setMessage('Connecting to career assistant...');
      // Add Vapi client connection logic here
    } else {
      setMessage('');
    }
  };

  return (
    <>
      {isActive && (
        <div className={styles.voiceDialog}>
          <div className={styles.voiceStatus}>
            {message || 'Chat with your Career Assistant...'}
          </div>
          <div className={styles.voiceWaves}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      <button 
        onClick={handleClick}
        className={`${styles.voiceAssistant} ${isActive ? styles.active : ''}`}
      >
        {isActive ? 'End Call' : '📞  Career Assistant'}
      </button>
    </>
  );
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [diversity, setDiversity] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [locations, setLocations] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [diversityTypes, setDiversityTypes] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetch('/api/jobs')
        .then(res => res.json())
        .then(data => {
          setJobs(data.jobs);
          
          const uniqueLocations = [...new Set(data.jobs.map((job: Job) => job.location))] as string[];
          const uniqueCompanies = [...new Set(data.jobs.map((job: Job) => job.company))] as string[];
          const uniqueDiversity = [...new Set(data.jobs.flatMap((job: Job) => job.diversity_types))] as string[];
          
          setLocations(uniqueLocations);
          setCompanies(uniqueCompanies);
          setDiversityTypes(uniqueDiversity);
          setLoading(false);
        });
    }
  }, [mounted]);

  const handleSearch = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (location) params.append('location', location);
    if (company) params.append('company', company);
    if (diversity) params.append('diversity', diversity);

    try {
      const response = await fetch(`/api/jobs?${params.toString()}`);
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // 添加处理回车键的函数
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={styles.page}>
      <div className={styles.illustration}>
        <Image
          src="/job-search-illustration.svg"
          alt="Job Search Illustration"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
          priority
        />
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>Find Your Next Role in an Inclusive Workplace</h1>
        <p className={styles.subtitle}>Discover opportunities at companies committed to diversity and inclusion</p>
        
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search jobs or descriptions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}  // 添加键盘事件监听
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filters}>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={styles.select}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={styles.select}
            >
              <option value="">All Companies</option>
              {companies.map((comp) => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>

            <select
              value={diversity}
              onChange={(e) => setDiversity(e.target.value)}
              className={styles.select}
            >
              <option value="">All Diversity Types</option>
              {diversityTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <button onClick={handleSearch} className={styles.searchButton}>
              Search Jobs
            </button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.jobsList}>
            {jobs.map((job) => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobHeader}>
                  <h2>{job.title}</h2>
                  <span className={styles.salary}>{job.salary}</span>
                </div>
                <div className={styles.companyInfo}>
                  <h3>{job.company}</h3>
                  <span className={styles.location}>{job.location}</span>
                </div>
                <p className={styles.description}>{job.description}</p>
                <div className={styles.tags}>
                  {job.diversity_types.map((type) => (
                    <span key={type} className={styles.tag}>{type}</span>
                  ))}
                </div>
                <div className={styles.benefits}>
                  <h4>Benefits</h4>
                  <div className={styles.benefitTags}>
                    {job.benefits.map((benefit) => (
                      <span key={benefit} className={styles.benefitTag}>{benefit}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <VoiceAssistantButton />
    </div>
  );
}
