    const polymatDefaults = [
        {
            key: 'hero',
            data: {
                subtitle: 'INTERNATIONAL CONFERENCE ON',
                title: 'Polymers and Composite\nMaterials',
                description: 'Annual International Conference on Polymers and Composite Materials. where global experts unite to shape the future of material science and polymer engineering. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
                conferenceDate: 'December 14-16, 2026',
                venue: 'Outram, Singapore',
                countdownTarget: '2026-12-14T09:00:00+01:00',
                showRegister: true,
                showAbstract: true,
                showBrochure: true
            }
        },
        {
            key: 'about',
            data: {
                subtitle: 'Innovations in Polymer Science and Composite Materials',
                title: 'About The Conference',
                paragraph1: 'The Annual International Conference on Polymers and Composite Materials is a premier global platform dedicated to advancing the understanding of cutting-edge materials science and composite applications that are transforming industries worldwide.',
                paragraph2: 'This conference brings together leading researchers, academicians, scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, innovative applications, and real-world implementations of Polymers and Composite Materials solutions.',
                objectives: [
                    'Promote advancements in Polymers and Composite Materials research',
                    'Explore innovations in composite materials applications',
                    'Discuss computational and experimental approaches in material characterization',
                    'Bridge academia and industry in materials science research',
                    'Encourage collaboration across engineering, physics, chemistry, and biotechnology domains'
                ],
                keyThemes: [
                    'Polymer Materials and Composites',
                    'Smart Materials and Functional Coatings',
                    'Biomaterials and Tissue Engineering',
                    'Energy Storage and Conversion Materials',
                    'Sustainable and Green Polymers',
                    'Advanced Polymers and Composite Applications'
                ]
            }
        },
        {
            key: 'importantDates',
            data: {
                dates: [
                    { month: 'JUN', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                    { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                    { month: 'OCT', day: '30', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
                    { month: 'DEC', day: '14', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 14-16, 2026, Singapore' }
                ]
            }
        },
        {
            key: 'stats',
            data: {
                title: 'POLYMAT SUMMIT CONFERENCES APPROACH',
                items: [
                    { number: '15+', label: 'Years Experience' },
                    { number: '100+', label: 'Events' },
                    { number: '200+', label: 'Onsite Approach' },
                    { number: '2000+', label: 'Speakers' },
                    { number: '5000+', label: 'Attendees' },
                    { number: '20+', label: 'Exhibitors' },
                    { number: '150+', label: 'Countries' },
                    { number: '2000+', label: 'Publications' }
                ]
            }
        },
        {
            key: 'pricing',
            data: {
                title: 'REGISTRATION PRICING',
                packages: [
                    {
                        title: 'Speaker',
                        price: '799',
                        currency: 'USD',
                        features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Delegate',
                        price: '899',
                        currency: 'USD',
                        features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Student',
                        price: '499',
                        currency: 'USD',
                        features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    }
                ]
            }
        },
        {
            key: 'sessions',
            data: {
                sessions: [
                    'Polymer Materials and Composites',
                    'Polymer Material Methods',
                    'Biomaterials and Tissue Engineering',
                    'CFD Applications in Vortex Dynamics',
                    'Sustainable and Green Polymers',
                    'AI & Data-Driven Flow Field Identification',
                    'Experimental Methods in Vortex Research',
                    'Polymer Applications in Engineering',
                    'DNS and LES of Turbulent Flows',
                    'Instability and Transition in Fluid Flows',
                    'Boundary Layer Vortex Structures',
                    'Coherent Structures in Turbulence',
                    'Multi-Scale Vortex Interactions',
                    'Particle Tracking in Vortical Flows',
                    'Wake Dynamics and Control',
                    'Biofluid Mechanics and Vortex Patterns',
                    'Vortex-Induced Vibrations',
                    'Flow Visualization Techniques',
                    'Machine Learning for Fluid Mechanics',
                    'Green Energy & Vortex Dynamics'
                ],
                schedule: {
                    day1: [
                        { time: '8.30 ? 9.00', program: 'Registration' },
                        { time: '9.00 ? 9.30', program: 'Conference Inauguration' },
                        { time: '9.30 ? 11.00', program: 'Plenary Sessions' },
                        { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' },
                        { time: '11.20 ? 13.00', program: 'Plenary Sessions' },
                        { time: '13.00 ? 13.10', program: 'Group Photograph' },
                        { time: '13.10 ? 14.00', program: 'Lunch' },
                        { time: '14.00 ? 15.40', program: 'Keynote Sessions' },
                        { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' },
                        { time: '16.00 ? 17.30', program: 'Keynote Sessions' },
                        { time: '17.30 ? 18.30', program: 'Workshop' }
                    ],
                    day2: [
                        { time: '9.00 ? 10.30', program: 'Scientific Sessions' },
                        { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' },
                        { time: '10.50 ? 13.00', program: 'Poster Presentations' },
                        { time: '13.00 ? 14.00', program: 'Lunch' },
                        { time: '14.00 ? 15.30', program: 'Panel Discussions' },
                        { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' }
                    ],
                    day3: [
                        { time: '9.00 ? 10.30', program: 'Networking Session' },
                        { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' },
                        { time: '11.00 ? 12.30', program: 'Future Trends Workshop' },
                        { time: '12.30 ? 13.30', program: 'Lunch' },
                        { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' }
                    ]
                }
            }
        },
        {
            key: 'venue',
            data: {
                title: 'Conference Venue',
                name: 'Outram, Singapore',
                address: 'Singapore',
                description: 'A world-class conference venue in the heart of Singapore, offering state-of-the-art facilities for an international academic conference.',
                images: [
                    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                    'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80',
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80'
                ]
            }
        },
        {
            key: 'contact',
            data: {
                email: 'contact@polymatsummit.com',
                phone: '+65 0000 0000',
                address: 'Singapore',
                socialLinks: {
                    facebook: '',
                    twitter: '',
                    linkedin: '',
                    instagram: ''
                }
            }
        },
        {
            key: 'marquee',
            data: {
                title: 'Supporting Universities & Institutions',
                items: [
                    'University of Texas at Arlington',
                    'Peking University',
                    'Tsinghua University',
                    'National University of Singapore',
                    'MIT',
                    'Stanford University',
                    'ETH Zurich',
                    'Imperial College London',
                    'Caltech',
                    'University of Cambridge'
                ]
            }
        }
    ];

    // ??? FLUID Conference Data ????????????????????????????????????
    const fluidDefaults = [
        {
            key: 'hero',
            data: {
                subtitle: 'INTERNATIONAL CONFERENCE ON',
                title: 'FLUID MECHANICS & TURBOMACHINERY',
                description: 'International Conference on Fluid Mechanics & Turbomachinery, where global experts unite to shape the future of engineering dynamics. Discover ground-breaking innovations in fluid systems, connect with top mechanical engineers, and explore solutions transforming industrial efficiency.',
                conferenceDate: 'December 14-16, 2026',
                venue: 'Outram, Singapore',
                countdownTarget: '2026-12-14T09:00:00+01:00',
                showRegister: true,
                showAbstract: true,
                showBrochure: true
            }
        },
        {
            key: 'about',
            data: {
                subtitle: 'Fluid Mechanics & Turbomachinery Engineering',
                title: 'About The Conference',
                paragraph1: 'The International Conference on Fluid Mechanics & Turbomachinery is a premier international platform dedicated to advancing the understanding of fluid dynamics, turbomachinery systems, and their transformative applications in engineering.',
                paragraph2: 'This conference brings together leading researchers, academicians, mechanical engineers, and industry professionals to explore recent developments, innovative technologies, and real-world applications in fluid mechanics and turbomachinery design.',
                objectives: [
                    'Global Collaboration: Facilitate networking among researchers, engineers, and industry leaders',
                    'Innovation Showcase: Highlight cutting-edge research and advanced technologies in turbomachinery',
                    'Bridge Academia & Industry: Create platform for translational research and industrial applications',
                    'Sustainability Focus: Explore energy-efficient solutions and green technologies',
                    'Empower Future Leaders: Provide mentorship and presentation opportunities for students',
                    'Knowledge Dissemination: Publish high-quality findings and foster engineering discussions'
                ],
                keyThemes: [
                    'Computational Fluid Dynamics (CFD): Advanced simulations and turbulence modeling',
                    'Aerodynamics & Hydrodynamics: Flow analysis and propulsion systems',
                    'Turbomachinery Design: Gas turbines, compressors, pumps, and wind turbines',
                    'Heat & Mass Transfer: Thermal management and multiphase flows',
                    'Renewable Energy Systems: Hydropower, tidal energy, and wind energy conversion',
                    'Fluid-Structure Interaction: Vibration analysis and aeroelasticity'
                ]
            }
        },
        {
            key: 'importantDates',
            data: {
                dates: [
                    { month: 'JUN', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                    { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                    { month: 'OCT', day: '30', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
                    { month: 'DEC', day: '14', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 14-16, 2026, Singapore' }
                ]
            }
        },
        {
            key: 'stats',
            data: {
                title: 'FLUID MECHANICS & TURBOMACHINERY CONFERENCES APPROACH',
                items: [
                    { number: '15+', label: 'Years Experience' },
                    { number: '100+', label: 'Events' },
                    { number: '200+', label: 'Onsite Approach' },
                    { number: '2000+', label: 'Speakers' },
                    { number: '5000+', label: 'Attendees' },
                    { number: '20+', label: 'Exhibitors' },
                    { number: '150+', label: 'Countries' },
                    { number: '2000+', label: 'Publications' }
                ]
            }
        },
        {
            key: 'pricing',
            data: {
                title: 'REGISTRATION PRICING',
                packages: [
                    {
                        title: 'Speaker',
                        price: '799',
                        currency: 'USD',
                        features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Delegate',
                        price: '899',
                        currency: 'USD',
                        features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Student',
                        price: '499',
                        currency: 'USD',
                        features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    }
                ]
            }
        },
        {
            key: 'sessions',
            data: {
                sessions: [
                    'Computational Fluid Dynamics (CFD)',
                    'Aerodynamics & Hydrodynamics',
                    'Turbomachinery Design & Analysis',
                    'Heat & Mass Transfer',
                    'Renewable Energy Systems',
                    'Fluid-Structure Interaction',
                    'Multiphase Flow Systems',
                    'Combustion & Propulsion',
                    'Flow Control & Optimization',
                    'Experimental Fluid Mechanics',
                    'Turbulence Modeling',
                    'Pump & Compressor Technology',
                    'Wind Energy Aerodynamics',
                    'Marine Propulsion Systems',
                    'Gas Turbine Technology',
                    'Hydraulic Machinery',
                    'Flow Measurement Techniques',
                    'Energy Conversion Systems',
                    'Industrial Fluid Applications',
                    'Sustainable Engineering Solutions'
                ],
                schedule: {
                    day1: [
                        { time: '8.30 ? 9.00', program: 'Registration' },
                        { time: '9.00 ? 9.30', program: 'Conference Inauguration' },
                        { time: '9.30 ? 11.00', program: 'Plenary Sessions' },
                        { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' },
                        { time: '11.20 ? 13.00', program: 'Plenary Sessions' },
                        { time: '13.00 ? 13.10', program: 'Group Photograph' },
                        { time: '13.10 ? 14.00', program: 'Lunch' },
                        { time: '14.00 ? 15.40', program: 'Keynote Sessions' },
                        { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' },
                        { time: '16.00 ? 17.30', program: 'Keynote Sessions' },
                        { time: '17.30 ? 18.30', program: 'Workshop' }
                    ],
                    day2: [
                        { time: '9.00 ? 10.30', program: 'Scientific Sessions' },
                        { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' },
                        { time: '10.50 ? 13.00', program: 'Poster Presentations' },
                        { time: '13.00 ? 14.00', program: 'Lunch' },
                        { time: '14.00 ? 15.30', program: 'Panel Discussions' },
                        { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' }
                    ],
                    day3: [
                        { time: '9.00 ? 10.30', program: 'Networking Session' },
                        { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' },
                        { time: '11.00 ? 12.30', program: 'Future Trends Workshop' },
                        { time: '12.30 ? 13.30', program: 'Lunch' },
                        { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' }
                    ]
                }
            }
        },
        {
            key: 'venue',
            data: {
                title: 'Conference Venue',
                name: 'Outram, Singapore',
                address: 'Singapore',
                description: 'A world-class conference venue in the heart of Singapore, offering state-of-the-art facilities for an international engineering conference.',
                images: [
                    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                    'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80',
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80'
                ]
            }
        },
        {
            key: 'contact',
            data: {
                email: 'info@fluidmechsummit.com',
                phone: '+65 0000 0000',
                address: 'Singapore',
                socialLinks: {
                    facebook: '',
                    twitter: '',
                    linkedin: '',
                    instagram: ''
                }
            }
        },
        {
            key: 'marquee',
            data: {
                title: 'Supporting Universities & Institutions',
                items: [
                    'MIT',
                    'Stanford University',
                    'ETH Zurich',
                    'Imperial College London',
                    'Caltech',
                    'University of Cambridge',
                    'National University of Singapore',
                    'Technical University of Munich',
                    'Georgia Institute of Technology',
                    'University of Michigan'
                ]
            }
        }
    ];

    // ??? FOODAGRI Conference Data ?????????????????????????????????
    const foodagriDefaults = [
        {
            key: 'hero',
            data: {
                subtitle: 'INTERNATIONAL CONFERENCE ON',
                title: 'FOOD SCIENCE TECHNOLOGY AND AGRICULTURE',
                description: 'International Conference on Food Science Technology and Agriculture, where global experts unite to shape the future of food science and agricultural innovation. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
                conferenceDate: 'December 07-09, 2026',
                venue: 'Marina Bay, Singapore',
                countdownTarget: '2026-12-07T09:00:00+08:00',
                showRegister: true,
                showAbstract: true,
                showBrochure: true
            }
        },
        {
            key: 'about',
            data: {
                subtitle: 'Advancing Food Innovation',
                title: 'About The Conference',
                paragraph1: 'The International Conference on Food Science Technology and Agriculture is a premier international platform dedicated to advancing the understanding of food science, agricultural innovation, and sustainable food systems.',
                paragraph2: 'This conference brings together leading researchers, academicians, food scientists, agricultural experts, and industry professionals to explore recent developments, innovative technologies, sustainable practices, and real-world applications in food science and agriculture.',
                objectives: [
                    'Promote advancements in food science and technology',
                    'Explore innovations in sustainable agriculture',
                    'Discuss food safety, quality control, and nutritional science',
                    'Bridge academia and industry in agricultural research',
                    'Encourage collaboration across food processing, biotechnology, and environmental sustainability domains'
                ],
                keyThemes: [
                    'Food Processing and Preservation Technologies',
                    'Sustainable Agriculture and Crop Management',
                    'Food Safety and Quality Assurance',
                    'Nutritional Science and Functional Foods',
                    'Agricultural Biotechnology and Genetic Engineering',
                    'Smart Farming and Precision Agriculture'
                ]
            }
        },
        {
            key: 'importantDates',
            data: {
                dates: [
                    { month: 'JUL', day: '01', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                    { month: 'SEP', day: '30', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                    { month: 'NOV', day: '15', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
                    { month: 'DEC', day: '07', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'December 07-09, Singapore' }
                ]
            }
        },
        {
            key: 'stats',
            data: {
                title: 'FOOD AGRI SUMMIT CONFERENCES APPROACH',
                items: [
                    { number: '15+', label: 'Years Experience' },
                    { number: '100+', label: 'Events' },
                    { number: '200+', label: 'Onsite Approach' },
                    { number: '2000+', label: 'Speakers' },
                    { number: '5000+', label: 'Attendees' },
                    { number: '20+', label: 'Exhibitors' },
                    { number: '150+', label: 'Countries' },
                    { number: '2000+', label: 'Publications' }
                ]
            }
        },
        {
            key: 'pricing',
            data: {
                title: 'REGISTRATION PRICING',
                packages: [
                    {
                        title: 'Speaker',
                        price: '799',
                        currency: 'USD',
                        features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Delegate',
                        price: '899',
                        currency: 'USD',
                        features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    },
                    {
                        title: 'Student',
                        price: '499',
                        currency: 'USD',
                        features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                    }
                ]
            }
        },
        {
            key: 'sessions',
            data: {
                sessions: [
                    'Food Processing & Engineering',
                    'Sustainable Agriculture',
                    'Food Safety & Quality Control',
                    'Agricultural Biotechnology',
                    'Nutritional Science & Dietetics',
                    'Smart Farming & IoT',
                    'Soil Science & Plant Nutrition',
                    'Post-Harvest Technology',
                    'Food Microbiology',
                    'Animal Science & Husbandry',
                    'Organic Farming',
                    'Food Supply Chain Management',
                    'Precision Agriculture',
                    'Food Waste Management',
                    'Climate-Resilient Agriculture',
                    'Aquaculture & Fisheries',
                    'Dairy Technology',
                    'Functional Foods & Nutraceuticals',
                    'Agricultural Economics',
                    'Food Packaging Innovations'
                ],
                schedule: {
                    day1: [
                        { time: '8.30 ? 9.00', program: 'Registration' },
                        { time: '9.00 ? 9.30', program: 'Conference Inauguration' },
                        { time: '9.30 ? 11.00', program: 'Plenary Sessions' },
                        { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' },
                        { time: '11.20 ? 13.00', program: 'Plenary Sessions' },
                        { time: '13.00 ? 13.10', program: 'Group Photograph' },
                        { time: '13.10 ? 14.00', program: 'Lunch' },
                        { time: '14.00 ? 15.40', program: 'Keynote Sessions' },
                        { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' },
                        { time: '16.00 ? 17.30', program: 'Keynote Sessions' },
                        { time: '17.30 ? 18.30', program: 'Workshop' }
                    ],
                    day2: [
                        { time: '9.00 ? 10.30', program: 'Scientific Sessions' },
                        { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' },
                        { time: '10.50 ? 13.00', program: 'Poster Presentations' },
                        { time: '13.00 ? 14.00', program: 'Lunch' },
                        { time: '14.00 ? 15.30', program: 'Panel Discussions' },
                        { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' }
                    ],
                    day3: [
                        { time: '9.00 ? 10.30', program: 'Networking Session' },
                        { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' },
                        { time: '11.00 ? 12.30', program: 'Future Trends Workshop' },
                        { time: '12.30 ? 13.30', program: 'Lunch' },
                        { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' }
                    ]
                }
            }
        },
        {
            key: 'venue',
            data: {
                title: 'Conference Venue',
                name: 'Marina Bay, Singapore',
                address: 'Singapore',
                description: 'A world-class conference venue in Marina Bay, Singapore, offering state-of-the-art facilities for an international food science and agriculture conference.',
                images: [
                    'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                    'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80',
                    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80'
                ]
            }
        },
        {
            key: 'marquee',
            data: {
                title: 'Supporting Universities & Institutions',
                items: [
                    'National University of Singapore',
                    'Wageningen University & Research',
                    'Cornell University',
                    'UC Davis',
                    'China Agricultural University',
                    'University of Reading',
                    'Texas A&M University',
                    'University of Guelph',
                    'Nanyang Technological University',
                    'University of Tokyo'
                ]
            }
        }
    ];

    // ??? Seed Data for All Conferences ????????????????????????????
    const conferences = [
        { name: 'polymat', defaults: polymatDefaults },
        { name: 'fluid', defaults: fluidDefaults },
        { name: 'foodagri', defaults: foodagriDefaults },
        {
            name: 'renewable',
            defaults: [
                {
                    key: 'hero',
                    data: {
                        subtitle: 'INTERNATIONAL CONFERENCE ON',
                        title: 'RENEWABLE ENERGY & CLIMATE CHANGE',
                        description: 'Join distinguished researchers, industry leaders, and policymakers at the forefront of renewable energy innovation and climate action. Engage with cutting-edge research, establish strategic collaborations, and contribute to sustainable solutions addressing critical global environmental challenges.',
                        conferenceDate: 'March 23-25, 2027',
                        venue: 'Munich, Germany',
                        countdownTarget: '2027-03-23T09:00:00+01:00',
                        showRegister: true,
                        showAbstract: true,
                        showBrochure: true
                    }
                },
                {
                    key: 'about',
                    data: {
                        subtitle: 'Renewable Energy & Climate Action',
                        title: 'About The Conference',
                        paragraph1: 'The International Conference on Renewable Energy & Climate Change is a leading global forum dedicated to advancing sustainable energy technologies and fostering proactive solutions for climate change mitigation.',
                        paragraph2: 'This conference brings together scientists, engineers, environmentalists, and industry experts to share revolutionary research, discuss policy frameworks, and explore the latest innovations in solar, wind, bioenergy, and climate science.',
                        objectives: [
                            'Global Synergy: Foster international cooperation among researchers, policymakers, and industry leaders',
                            'Innovation Catalyst: Showcase breakthrough technologies in renewable energy storage and conversion',
                            'Bridge Science & Policy: Facilitate dialogue for translating climate research into actionable policies',
                            'Sustainability Leadership: Explore scalable solutions for achieving global net-zero targets',
                            'Empowering the Next Gen: Offer a platform for young researchers and students to present their work',
                            'Knowledge Hub: Publish significant findings and promote cross-disciplinary learning'
                        ],
                        keyThemes: [
                            'Solar & Wind Energy Technologies: Efficiency improvements and large-scale integration',
                            'Climate Change Mitigation: Carbon capture, storage, and emissions reduction strategies',
                            'Hydrogen Energy & Fuel Cells: Innovations in production and infrastructure',
                            'Bioenergy & Bio-refineries: Sustainable sources and technological advancements',
                            'Smart Grids & Energy Storage: Modernizing power distribution and battery tech',
                            'Environmental Policy & Economics: Market-driven solutions and regulatory frameworks'
                        ]
                    }
                },
                {
                    key: 'importantDates',
                    data: {
                        dates: [
                            { month: 'SEP', day: '01', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                            { month: 'DEC', day: '15', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                            { month: 'FEB', day: '10', year: '2027', event: 'Submission Deadline', icon: 'Clock' },
                            { month: 'MAR', day: '23', year: '2027', event: 'Conference Date', icon: 'Star', sub: 'March 23-25, 2027, Munich, Germany' }
                        ]
                    }
                },
                {
                    key: 'stats',
                    data: {
                        title: 'RENEWABLE ENERGY SUMMIT IMPACT',
                        items: [
                            { number: '15+', label: 'Years Experience' },
                            { number: '100+', label: 'Events' },
                            { number: '200+', label: 'Onsite Approach' },
                            { number: '2000+', label: 'Speakers' },
                            { number: '5000+', label: 'Attendees' },
                            { number: '20+', label: 'Exhibitors' },
                            { number: '150+', label: 'Countries' },
                            { number: '2000+', label: 'Publications' }
                        ]
                    }
                },
                {
                    key: 'pricing',
                    data: {
                        title: 'REGISTRATION PRICING',
                        packages: [
                            {
                                title: 'Speaker',
                                price: '799',
                                currency: 'USD',
                                features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Delegate',
                                price: '899',
                                currency: 'USD',
                                features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Student',
                                price: '499',
                                currency: 'USD',
                                features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }
                        ]
                    }
                },
                {
                    key: 'sessions',
                    data: {
                        sessions: [
                            'Solar Energy Technologies',
                            'Wind Energy Systems',
                            'Climate Change Mitigation',
                            'Hydrogen Production & Infrastructure',
                            'Bioenergy & Biofuels',
                            'Smart Grids & Energy storage',
                            'Environmental Policy & Economics',
                            'Geothermal Energy Systems',
                            'Ocean & Tidal Energy',
                            'Energy Efficient Buildings',
                            'Sustainable Urban Planning',
                            'Electric Vehicle Infrastructure',
                            'Circular Economy in Energy',
                            'Carbon Capture & Storage',
                            'Ecosystem Restoration',
                            'Climate Adaptation Strategies',
                            'Green Financing & Investment',
                            'Renewable Energy Integration',
                            'Artificial Intelligence in Climate Action',
                            'Waste-to-Energy Innovations'
                        ],
                        schedule: {
                            day1: [
                                { time: '8.30 ? 9.00', program: 'Registration' },
                                { time: '9.00 ? 9.30', program: 'Conference Inauguration' },
                                { time: '9.30 ? 11.00', program: 'Plenary Sessions' },
                                { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' },
                                { time: '11.20 ? 13.00', program: 'Plenary Sessions' },
                                { time: '13.00 ? 13.10', program: 'Group Photograph' },
                                { time: '13.10 ? 14.00', program: 'Lunch' },
                                { time: '14.00 ? 15.40', program: 'Keynote Sessions' },
                                { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' },
                                { time: '16.00 ? 17.30', program: 'Keynote Sessions' },
                                { time: '17.30 ? 18.30', program: 'Workshop' }
                            ],
                            day2: [
                                { time: '9.00 ? 10.30', program: 'Scientific Sessions' },
                                { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' },
                                { time: '10.50 ? 13.00', program: 'Poster Presentations' },
                                { time: '13.00 ? 14.00', program: 'Lunch' },
                                { time: '14.00 ? 15.30', program: 'Panel Discussions' },
                                { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' }
                            ],
                            day3: [
                                { time: '9.00 ? 10.30', program: 'Networking Session' },
                                { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' },
                                { time: '11.00 ? 12.30', program: 'Future Trends Workshop' },
                                { time: '12.30 ? 13.30', program: 'Lunch' },
                                { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' }
                            ]
                        }
                    }
                },
                {
                    key: 'venue',
                    data: {
                        title: 'Conference Venue',
                        name: 'Munich, Germany',
                        address: 'Munich, Germany',
                        description: 'Munich, the capital of Bavaria, is a city where history meets high-tech. Known for its beautiful architecture, world-class museums, and as a hub for engineering and environmental innovation, it provides the perfect backdrop for our conference.',
                        images: [
                            'https://images.unsplash.com/photo-1595181710363-f1109f2d1130?w=1920&q=80',
                            'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80',
                            'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80'
                        ]
                    }
                },
                {
                    key: 'contact',
                    data: {
                        email: 'info@renewableclisummit.com',
                        phone: '+49 000 000 000',
                        address: 'Munich, Germany',
                        socialLinks: {
                            facebook: '',
                            twitter: '',
                            linkedin: '',
                            instagram: ''
                        }
                    }
                },
                {
                    key: 'marquee',
                    data: {
                        title: 'Supporting Universities & Institutions',
                        items: [
                            'Technical University of Munich',
                            'University of Stuttgart',
                            'Max Planck Institute',
                            'Stanford University',
                            'ETH Zurich',
                            'Fraunhofer Institute',
                            'National Renewable Energy Laboratory (NREL)',
                            'Imperial College London',
                            'University of California, Berkeley',
                            'University of Cambridge'
                        ]
                    }
                }
            ]
        },
        {
            name: 'cyber',
            defaults: [
                {
                    key: 'hero',
                    data: {
                        subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON',
                        title: 'CYBERSECURITY AND QUANTUM COMPUTING',
                        description: 'Global Summit on Cybersecurity and Quantum Computing, where global experts unite to shape the future of digital security and quantum technologies. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming our world.',
                        conferenceDate: 'December 07-09, 2027',
                        venue: 'Marina Bay, Singapore',
                        countdownTarget: '2027-12-07T09:00:00+08:00',
                        showRegister: true,
                        showAbstract: true,
                        showBrochure: true
                    }
                },
                {
                    key: 'about',
                    data: {
                        subtitle: 'Cybersecurity and Quantum Computing',
                        title: 'About The Conference',
                        paragraph1: 'The Annual International Conference on Cybersecurity and Quantum Computing is a premier international platform dedicated to advancing the understanding of cybersecurity challenges and quantum computing solutions in the rapidly evolving digital landscape.',
                        paragraph2: 'This conference brings together leading researchers, academicians, cybersecurity professionals, quantum scientists, engineers, and industry leaders to explore recent developments, theoretical foundations, and real-world applications of quantum-enhanced security systems.',
                        objectives: [
                            'Promote advancements in quantum computing and cybersecurity',
                            'Explore innovations in post-quantum cryptography techniques',
                            'Discuss quantum-resistant security frameworks and protocols',
                            'Bridge academia and industry in digital security research',
                            'Encourage collaboration across computer science, mathematics, and engineering domains'
                        ],
                        keyThemes: [
                            'Fundamentals of Quantum Computing',
                            'Post-Quantum Cryptography Standards',
                            'Quantum Key Distribution (QKD)',
                            'Cybersecurity Threat Intelligence',
                            'AI-Driven Security Analytics',
                            'Quantum-Safe Network Architectures'
                        ]
                    }
                },
                {
                    key: 'importantDates',
                    data: {
                        dates: [
                            { month: 'SEP', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                            { month: 'NOV', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                            { month: 'JAN', day: '25', year: '2027', event: 'Submission Deadline', icon: 'Clock' },
                            { month: 'DEC', day: '07', year: '2027', event: 'Conference Date', icon: 'Star', sub: 'December 07-09, 2027, Singapore' }
                        ]
                    }
                },
                {
                    key: 'stats',
                    data: {
                        title: 'SCIENGA SUMMITS CONFERENCES APPROACH',
                        items: [
                            { number: '15+', label: 'Years Experience' },
                            { number: '100+', label: 'Annual Events' },
                            { number: '200+', label: 'Onsite Approach' },
                            { number: '2000+', label: 'Speakers' },
                            { number: '5000+', label: 'Attendees' },
                            { number: '20+', label: 'Exhibitors' },
                            { number: '150+', label: 'Countries' },
                            { number: '2000+', label: 'Publications' }
                        ]
                    }
                },
                {
                    key: 'pricing',
                    data: {
                        title: 'REGISTRATION PRICING',
                        packages: [
                            {
                                title: 'Speaker',
                                price: '799',
                                currency: 'USD',
                                features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Delegate',
                                price: '899',
                                currency: 'USD',
                                features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Student',
                                price: '499',
                                currency: 'USD',
                                features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }
                        ]
                    }
                },
                {
                    key: 'sessions',
                    data: {
                        sessions: [
                            'Fundamentals of Quantum Computing',
                            'Post-Quantum Cryptography (PQC)',
                            'Quantum Key Distribution (QKD)',
                            'Cybersecurity Threat Intelligence',
                            'AI-Driven Security Analytics',
                            'Quantum-Safe Network Architectures',
                            'Zero Trust Security Frameworks',
                            'Blockchain & Distributed Ledger Security',
                            'Cloud & Edge Computing Security',
                            'Internet of Things (IoT) Security',
                            'Digital Forensics & Incident Response',
                            'Ethical Hacking & Penetration Testing',
                            'Quantum Error Correction',
                            'Quantum Algorithms & Complexity',
                            'Quantum Machine Learning',
                            'Critical Infrastructure Protection',
                            'Privacy Enhancing Technologies',
                            'Supply Chain Security',
                            'Cyber Risk Management & Governance',
                            'Regulatory Compliance & Policy Frameworks'
                        ],
                        schedule: {
                            day1: [
                                { time: '8.30 ? 9.00', program: 'Registration' },
                                { time: '9.00 ? 9.30', program: 'Conference Inauguration' },
                                { time: '9.30 ? 11.00', program: 'Plenary Sessions' },
                                { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' },
                                { time: '11.20 ? 13.00', program: 'Plenary Sessions' },
                                { time: '13.00 ? 13.10', program: 'Group Photograph' },
                                { time: '13.10 ? 14.00', program: 'Lunch' },
                                { time: '14.00 ? 15.40', program: 'Keynote Sessions' },
                                { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' },
                                { time: '16.00 ? 17.30', program: 'Keynote Sessions' },
                                { time: '17.30 ? 18.30', program: 'Workshop' }
                            ],
                            day2: [
                                { time: '9.00 ? 10.30', program: 'Scientific Sessions' },
                                { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' },
                                { time: '10.50 ? 13.00', program: 'Poster Presentations' },
                                { time: '13.00 ? 14.00', program: 'Lunch' },
                                { time: '14.00 ? 15.30', program: 'Panel Discussions' },
                                { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' }
                            ],
                            day3: [
                                { time: '9.00 ? 10.30', program: 'Networking Session' },
                                { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' },
                                { time: '11.00 ? 12.30', program: 'Future Trends Workshop' },
                                { time: '12.30 ? 13.30', program: 'Lunch' },
                                { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' }
                            ]
                        }
                    }
                },
                {
                    key: 'venue',
                    data: {
                        title: 'Conference Venue',
                        name: 'Marina Bay, Singapore',
                        address: 'Singapore',
                        description: 'A world-class conference facility in Marina Bay, Singapore ? a global hub for fintech, cybersecurity, and digital innovation ? offering state-of-the-art facilities and stunning waterfront views.',
                        images: [
                            'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                            'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80',
                            'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80'
                        ]
                    }
                },
                {
                    key: 'contact',
                    data: {
                        email: 'contact@cyberquantumsummit.com',
                        phone: '+91 7842090097',
                        address: 'Marina Bay, Singapore',
                        socialLinks: {
                            facebook: 'https://www.facebook.com/profile.php?id=61588065033161',
                            twitter: '',
                            linkedin: '',
                            instagram: 'https://www.instagram.com/sciengasummits/'
                        }
                    }
                },
                {
                    key: 'marquee',
                    data: {
                        title: 'Supporting Universities & Institutions',
                        items: [
                            'National University of Singapore',
                            'MIT',
                            'Stanford University',
                            'Carnegie Mellon University',
                            'ETH Zurich',
                            'Imperial College London',
                            'Georgia Institute of Technology',
                            'University of Waterloo',
                            'Nanyang Technological University',
                            'University of Maryland'
                        ]
                    }
                }
            ]
        },
        {
            name: 'powereng',
            defaults: [
                {
                    key: 'hero',
                    data: {
                        subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON',
                        title: 'POWER ENERGY AND ELECTRICAL ENGINEERING',
                        description: 'Annual International Conference on Power Energy and Electrical Engineering, where global experts unite to shape the future of sustainable energy. Discover ground-breaking power technologies, connect with top industry professionals, and explore solutions transforming our planet\'s energy grid.',
                        conferenceDate: 'March 23-25, 2027',
                        venue: 'Munich, Germany',
                        countdownTarget: '2027-03-23T09:00:00+01:00',
                        showRegister: true,
                        showAbstract: true,
                        showBrochure: true
                    }
                },
                {
                    key: 'about',
                    data: {
                        subtitle: 'Power Energy and Electrical Engineering',
                        title: 'About The Conference',
                        paragraph1: 'The Annual International Conference on Power Energy and Electrical Engineering is a premier international platform dedicated to advancing the understanding of power systems, electrical engineering, and sustainable energy technologies in the rapidly evolving global energy landscape.',
                        paragraph2: 'This conference brings together leading researchers, academicians, electrical engineers, power system designers, and industry professionals to explore recent developments, innovative technologies, sustainable practices, and real-world applications in power energy and electrical engineering.',
                        objectives: [
                            'Facilitate global collaboration on renewable energy solutions',
                            'Showcase cutting-edge sustainable technologies and innovations',
                            'Bridge the gap between academic research and industrial application',
                            'Formulate policy frameworks for a carbon-neutral future',
                            'Inspire next-generation leaders in electrical and energy engineering'
                        ],
                        keyThemes: [
                            'Smart Grid Technologies & Energy Storage',
                            'Power Electronics & Motor Drives',
                            'Renewable Energy Integration (Solar, Wind, Hydro)',
                            'Electric Vehicle Infrastructure & Charging Systems',
                            'High Voltage Engineering & Power Systems',
                            'Energy Efficiency & Conservation Techniques'
                        ]
                    }
                },
                {
                    key: 'importantDates',
                    data: {
                        dates: [
                            { month: 'SEP', day: '15', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                            { month: 'NOV', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                            { month: 'JAN', day: '25', year: '2027', event: 'Submission Deadline', icon: 'Clock' },
                            { month: 'MAR', day: '23', year: '2027', event: 'Conference Date', icon: 'Star', sub: 'March 23-25, 2027, Munich, Germany' }
                        ]
                    }
                },
                {
                    key: 'stats',
                    data: {
                        title: 'SCIENGA SUMMITS CONFERENCES APPROACH',
                        items: [
                            { number: '15+', label: 'Years Experience' },
                            { number: '100+', label: 'Annual Events' },
                            { number: '200+', label: 'Onsite Approach' },
                            { number: '2000+', label: 'Speakers' },
                            { number: '5000+', label: 'Attendees' },
                            { number: '20+', label: 'Exhibitors' },
                            { number: '150+', label: 'Countries' },
                            { number: '2000+', label: 'Publications' }
                        ]
                    }
                },
                {
                    key: 'pricing',
                    data: {
                        title: 'REGISTRATION PRICING',
                        packages: [
                            {
                                title: 'Speaker',
                                price: '799',
                                currency: 'USD',
                                features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Delegate',
                                price: '899',
                                currency: 'USD',
                                features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Student',
                                price: '499',
                                currency: 'USD',
                                features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }
                        ]
                    }
                },
                {
                    key: 'sessions',
                    data: {
                        sessions: [
                            'Smart Grid Technologies',
                            'Power Electronics & Converters',
                            'Renewable Energy Systems',
                            'Electric Machines & Drives',
                            'High Voltage Engineering',
                            'Energy Storage Technologies',
                            'Power Quality & Harmonics',
                            'Distributed Generation Systems',
                            'Electric Vehicles & Charging',
                            'Microgrids & Manogrids',
                            'HVDC & Flexible AC Transmission',
                            'Electromagnetic Compatibility',
                            'Protection & Control Systems',
                            'Power System Stability & Dynamics',
                            'Computational Intelligence in Power',
                            'Sustainable Energy Policy',
                            'Industrial Power Applications',
                            'Wireless Power Transfer',
                            'Energy Harvesting Technologies',
                            'Digital Twins in Power Systems'
                        ],
                        schedule: {
                            day1: [
                                { time: '8.30 - 9.00', program: 'Registration' },
                                { time: '9.00 - 9.30', program: 'Conference Inauguration' },
                                { time: '9.30 - 11.00', program: 'Plenary Sessions' },
                                { time: '11.00 - 11.20', program: 'Tea/Coffee Break' },
                                { time: '11.20 - 13.00', program: 'Plenary Sessions' },
                                { time: '13.00 - 13.10', program: 'Group Photograph' },
                                { time: '13.10 - 14.00', program: 'Lunch' },
                                { time: '14.00 - 15.40', program: 'Keynote Sessions' },
                                { time: '15.40 - 16.00', program: 'Tea/Coffee Break' },
                                { time: '16.00 - 17.30', program: 'Keynote Sessions' },
                                { time: '17.30 - 18.30', program: 'Workshop' }
                            ],
                            day2: [
                                { time: '9.00 - 10.30', program: 'Scientific Sessions' },
                                { time: '10.30 - 10.50', program: 'Tea/Coffee Break' },
                                { time: '10.50 - 13.00', program: 'Poster Presentations' },
                                { time: '13.00 - 14.00', program: 'Lunch' },
                                { time: '14.00 - 15.30', program: 'Panel Discussions' },
                                { time: '15.30 - 16.00', program: 'Award Ceremony & Closing' }
                            ],
                            day3: [
                                { time: '9.00 - 10.30', program: 'Networking Session' },
                                { time: '10.30 - 11.00', program: 'Tea/Coffee Break' },
                                { time: '11.00 - 12.30', program: 'Future Trends Workshop' },
                                { time: '12.30 - 13.30', program: 'Lunch' },
                                { time: '13.30 - 15.00', program: 'Final Remarks & Departure' }
                            ]
                        }
                    }
                },
                {
                    key: 'venue',
                    data: {
                        title: 'Conference Venue',
                        name: 'Munich, Germany',
                        address: 'Munich, Bavaria, Germany',
                        description: 'Munich, the capital of Bavaria, is a global hub for engineering and energy innovation. Home to world-leading exhibitions like Intersolar Europe and countless leading engineering firms, Munich provides the ideal backdrop for this premier power and energy conference.',
                        images: [
                            'https://images.unsplash.com/photo-1595181710363-f1109f2d1130?w=1920&q=80',
                            'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1920&q=80',
                            'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80'
                        ]
                    }
                },
                {
                    key: 'contact',
                    data: {
                        email: 'contact@powerenergysummit.com',
                        phone: '+91 7842090097',
                        address: 'Munich, Germany',
                        socialLinks: {
                            facebook: 'https://www.facebook.com/profile.php?id=61588065033161',
                            twitter: '',
                            linkedin: 'https://www.linkedin.com/company/scienga-summits/',
                            instagram: 'https://www.instagram.com/sciengasummits/'
                        }
                    }
                },
                {
                    key: 'marquee',
                    data: {
                        title: 'Supporting Universities & Institutions',
                        items: [
                            'Technical University of Munich',
                            'RWTH Aachen University',
                            'MIT',
                            'Stanford University',
                            'ETH Zurich',
                            'Imperial College London',
                            'Georgia Institute of Technology',
                            'Delft University of Technology',
                            'National University of Singapore',
                            'University of Stuttgart'
                        ]
                    }
                }
            ]
        }, 
        {
        
            name: 'polymat', 
            defaults: [
                {
                
                    key: 'hero', 
                    data: {
                    
                        subtitle: 'ANNUAL INTERNATIONAL CONFERENCE ON', 
                        title: 'POLYMERS AND COMPOSITE MATERIALS', 
                        description: 'Annual International Conference on Polymers and Composite Materials, where global experts unite to advance polymer science and composite engineering. Discover ground-breaking technologies, connect with top researchers, and explore solutions transforming the future of materials.', 
                        conferenceDate: 'November 16-18, 2026', 
                        venue: 'Amsterdam, Netherlands', 
                        countdownTarget: '2026-11-16T09:00:00+01:00', 
                        showRegister: true, 
                        showAbstract: true, 
                        showBrochure: true
                    }
                }, 
                {
                
                    key: 'about', 
                    data: {
                    
                        subtitle: 'Polymers and Composite Materials Science', 
                        title: 'About The Conference', 
                        paragraph1: 'The Annual International Conference on Polymers and Composite Materials is a premier global forum for polymer scientists, composite engineers, and materials researchers dedicated to advancing the frontiers of polymer synthesis, composite manufacturing, and sustainable materials integration.', 
                        paragraph2: 'This conference brings together leading researchers, academicians, industrial engineers, and industry professionals to explore recent developments, innovative technologies, and real-world applications in polymer science and composite materials engineering.', 
                        objectives: [
                            'Advance polymer synthesis and processing technologies', 
                            'Explore innovations in composite materials and nanocomposites', 
                            'Discuss biodegradable and sustainable polymer solutions', 
                            'Bridge academia and industry in materials science research', 
                            'Encourage collaboration in polymer electronics, coatings, and smart materials'
                        ], 
                        keyThemes: [
                            'Polymer Synthesis & Processing', 
                            'Composite Materials & Manufacturing', 
                            'Biodegradable & Sustainable Polymers', 
                            'Nanocomposites & Nanomaterials', 
                            'Fiber-Reinforced Composites', 
                            'Smart & Functional Polymers'
                        ]
                    }
                }, 
                {
                
                    key: 'importantDates', 
                    data: {
                    
                        dates: [
                            { month: 'JUN', day: '01', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' }, 
                            { month: 'SEP', day: '25', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' }, 
                            { month: 'OCT', day: '25', year: '2026', event: 'Submission Deadline', icon: 'Clock' }, 
                            { month: 'NOV', day: '16', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'November 16-18, 2026, Amsterdam, Netherlands' }
                        ]
                    }
                }, 
                {
                
                    key: 'stats', 
                    data: {
                    
                        title: 'POLYMAT SUMMIT CONFERENCES APPROACH', 
                        items: [
                            { number: '15+', label: 'Years Experience' }, 
                            { number: '100+', label: 'Events' }, 
                            { number: '200+', label: 'Onsite Approach' }, 
                            { number: '2000+', label: 'Speakers' }, 
                            { number: '5000+', label: 'Attendees' }, 
                            { number: '20+', label: 'Exhibitors' }, 
                            { number: '150+', label: 'Countries' }, 
                            { number: '2000+', label: 'Publications' }
                        ]
                    }
                }, 
                {
                
                    key: 'pricing', 
                    data: {
                    
                        title: 'REGISTRATION PRICING', 
                        packages: [
                            {
                            
                                title: 'Speaker', 
                                price: '749', 
                                currency: 'USD', 
                                features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }, 
                            {
                            
                                title: 'Delegate', 
                                price: '899', 
                                currency: 'USD', 
                                features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }, 
                            {
                            
                                title: 'Student', 
                                price: '299', 
                                currency: 'USD', 
                                features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }
                        ]
                    }
                }, 
                {
                
                    key: 'sessions', 
                    data: {
                    
                        sessions: [
                            'Polymer Synthesis & Processing', 
                            'Composite Materials & Manufacturing', 
                            'Biodegradable & Sustainable Polymers', 
                            'Nanocomposites & Nanomaterials', 
                            'Fiber-Reinforced Composites', 
                            'Polymer Characterization Techniques', 
                            'Smart & Functional Polymers', 
                            'Thermoplastics & Thermosets', 
                            'Rubber & Elastomers', 
                            'Adhesives & Sealants', 
                            '3D Printing with Polymers', 
                            'Polymer Recycling & Circular Economy', 
                            'Bio-based Polymers & Bioplastics', 
                            'Surface Modification of Composites', 
                            'Carbon Fiber & Advanced Composites', 
                            'Polymer Blends & Alloys', 
                            'Coatings & Films', 
                            'Epoxy & Phenolic Resins', 
                            'Mechanical Testing of Composites', 
                            'Polymer Electronics & Photonics'
                        ], 
                        schedule: {
                        
                            day1: [
                                { time: '8.30 - 9.00', program: 'Registration' }, 
                                { time: '9.00 - 9.30', program: 'Conference Inauguration' }, 
                                { time: '9.30 - 11.00', program: 'Plenary Sessions' }, 
                                { time: '11.00 - 11.20', program: 'Tea/Coffee Break' }, 
                                { time: '11.20 - 13.00', program: 'Plenary Sessions' }, 
                                { time: '13.00 - 13.10', program: 'Group Photograph' }, 
                                { time: '13.10 - 14.00', program: 'Lunch' }, 
                                { time: '14.00 - 15.40', program: 'Keynote Sessions' }, 
                                { time: '15.40 - 16.00', program: 'Tea/Coffee Break' }, 
                                { time: '16.00 - 17.30', program: 'Keynote Sessions' }, 
                                { time: '17.30 - 18.30', program: 'Workshop' }
                            ], 
                            day2: [
                                { time: '9.00 - 10.30', program: 'Scientific Sessions' }, 
                                { time: '10.30 - 10.50', program: 'Tea/Coffee Break' }, 
                                { time: '10.50 - 13.00', program: 'Poster Presentations' }, 
                                { time: '13.00 - 14.00', program: 'Lunch' }, 
                                { time: '14.00 - 15.30', program: 'Panel Discussions' }, 
                                { time: '15.30 - 16.00', program: 'Award Ceremony & Closing' }
                            ], 
                            day3: [
                                { time: '9.00 - 10.30', program: 'Networking Session' }, 
                                { time: '10.30 - 11.00', program: 'Tea/Coffee Break' }, 
                                { time: '11.00 - 12.30', program: 'Future Trends Workshop' }, 
                                { time: '12.30 - 13.30', program: 'Lunch' }, 
                                { time: '13.30 - 15.00', program: 'Final Remarks & Departure' }
                            ]
                        }
                    }
                }, 
                {
                
                    key: 'venue', 
                    data: {
                    
                        title: 'Conference Venue', 
                        name: 'Amsterdam, Netherlands', 
                        address: 'Amsterdam, North Holland, Netherlands', 
                        description: 'Amsterdam, the capital of the Netherlands, is a world-renowned hub for science, technology, and innovation. Home to leading research institutions and a vibrant international community, Amsterdam provides the ideal backdrop for this premier polymers and materials conference.', 
                        images: [
                            'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1920&q=80', 
                            'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&q=80', 
                            'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80'
                        ]
                    }
                }, 
                {
                
                    key: 'contact', 
                    data: {
                    
                        email: 'contact@polymatsummit.com', 
                        phone: '+91 7842090097', 
                        address: 'Amsterdam, Netherlands', 
                        socialLinks: {
                        
                            facebook: 'https://www.facebook.com/profile.php?id=61588065033161', 
                            twitter: '', 
                            linkedin: 'https://www.linkedin.com/company/scienga-summits/', 
                            instagram: 'https://www.instagram.com/sciengasummits/'
                        }
                    }
                }, 
                {
                
                    key: 'marquee', 
                    data: {
                    
                        title: 'Supporting Universities & Institutions', 
                        items: [
                            'ETH Zurich', 
                            'Delft University of Technology', 
                            'MIT', 
                            'Stanford University', 
                            'Imperial College London', 
                            'University of Cambridge', 
                            'National University of Singapore', 
                            'RWTH Aachen University', 
                            'Georgia Institute of Technology', 
                            'University of Amsterdam'
                        ]
                    }
                }
            ]
        },
        {
            name: 'iqces',
            defaults: [
                {
                    key: 'hero',
                    data: {
                        subtitle: 'INTERNATIONAL CONFERENCE ON',
                        title: 'QUANTUM COMPUTING & ENGINEERING',
                        description: 'The International Conference on Quantum Computing & Engineering (IQCES-2026) unites global experts to shape the future of quantum technologies. Discover ground-breaking quantum algorithms, connect with top quantum professionals, and explore engineering solutions transforming our world.',
                        conferenceDate: 'June 24-26, 2026',
                        venue: 'Bern, Switzerland',
                        countdownTarget: '2026-06-24T09:00:00+02:00',
                        showRegister: true,
                        showAbstract: true,
                        showBrochure: true
                    }
                },
                {
                    key: 'about',
                    data: {
                        subtitle: 'Quantum Computing & Engineering',
                        title: 'About The Conference',
                        paragraph1: 'The International Conference on Quantum Computing & Engineering 2026 is a premier international platform dedicated to advancing the understanding of quantum computation, quantum hardware, and their transformative engineering applications.',
                        paragraph2: 'This conference brings together leading researchers, academicians, quantum scientists, engineers, and industry professionals to explore recent developments, theoretical foundations, and real-world applications of quantum technologies.',
                        objectives: [
                            'Promote advancements in quantum computing hardware and software',
                            'Explore innovations in quantum algorithms and complexity theory',
                            'Discuss quantum error correction and fault-tolerant computing',
                            'Bridge academia and industry in quantum engineering research',
                            'Encourage collaboration across physics, computer science, and engineering domains'
                        ],
                        keyThemes: [
                            'Fundamentals of Quantum Mechanics & Computing',
                            'Quantum Algorithms & Complexity',
                            'Quantum Hardware: Superconducting, Photonic & Ion Trap',
                            'Quantum Error Correction & Fault Tolerance',
                            'Quantum Machine Learning',
                            'Quantum Cryptography & Communication'
                        ]
                    }
                },
                {
                    key: 'importantDates',
                    data: {
                        dates: [
                            { month: 'FEB', day: '01', year: '2026', event: 'Abstract Submission Opens', icon: 'CalendarDays' },
                            { month: 'APR', day: '30', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' },
                            { month: 'MAY', day: '31', year: '2026', event: 'Submission Deadline', icon: 'Clock' },
                            { month: 'JUN', day: '24', year: '2026', event: 'Conference Date', icon: 'Star', sub: 'June 24-26, 2026, Bern, Switzerland' }
                        ]
                    }
                },
                {
                    key: 'stats',
                    data: {
                        title: 'IQCES 2026 CONFERENCE APPROACH',
                        items: [
                            { number: '15+', label: 'Years Experience' },
                            { number: '100+', label: 'Events' },
                            { number: '200+', label: 'Onsite Approach' },
                            { number: '2000+', label: 'Speakers' },
                            { number: '5000+', label: 'Attendees' },
                            { number: '20+', label: 'Exhibitors' },
                            { number: '150+', label: 'Countries' },
                            { number: '2000+', label: 'Publications' }
                        ]
                    }
                },
                {
                    key: 'pricing',
                    data: {
                        title: 'REGISTRATION PRICING',
                        packages: [
                            {
                                title: 'Speaker',
                                price: '799',
                                currency: 'USD',
                                features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Delegate',
                                price: '899',
                                currency: 'USD',
                                features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            },
                            {
                                title: 'Student',
                                price: '499',
                                currency: 'USD',
                                features: ['Student Presentation', 'Meet Our Experts', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks']
                            }
                        ]
                    }
                },
                {
                    key: 'sessions',
                    data: {
                        sessions: [
                            'Fundamentals of Quantum Computing',
                            'Quantum Algorithms & Optimization',
                            'Quantum Hardware Platforms',
                            'Quantum Error Correction',
                            'Quantum Cryptography & Security',
                            'Quantum Machine Learning',
                            'Quantum Networking & Communication',
                            'Quantum Simulation',
                            'NISQ Era Applications',
                            'Topological Quantum Computing',
                            'Superconducting Qubits',
                            'Photonic Quantum Computing',
                            'Ion Trap Systems',
                            'Quantum Software & Programming',
                            'Quantum Cloud Platforms',
                            'Quantum Sensing & Metrology',
                            'Quantum Materials',
                            'Post-Quantum Cryptography',
                            'Quantum-AI Hybrid Systems',
                            'Industrial Quantum Applications'
                        ],
                        schedule: {
                            day1: [
                                { time: '8.30 - 9.00', program: 'Registration' },
                                { time: '9.00 - 9.30', program: 'Conference Inauguration' },
                                { time: '9.30 - 11.00', program: 'Plenary Sessions' },
                                { time: '11.00 - 11.20', program: 'Tea/Coffee Break' },
                                { time: '11.20 - 13.00', program: 'Plenary Sessions' },
                                { time: '13.00 - 13.10', program: 'Group Photograph' },
                                { time: '13.10 - 14.00', program: 'Lunch' },
                                { time: '14.00 - 15.40', program: 'Keynote Sessions' },
                                { time: '15.40 - 16.00', program: 'Tea/Coffee Break' },
                                { time: '16.00 - 17.30', program: 'Keynote Sessions' },
                                { time: '17.30 - 18.30', program: 'Workshop' }
                            ],
                            day2: [
                                { time: '9.00 - 10.30', program: 'Scientific Sessions' },
                                { time: '10.30 - 10.50', program: 'Tea/Coffee Break' },
                                { time: '10.50 - 13.00', program: 'Poster Presentations' },
                                { time: '13.00 - 14.00', program: 'Lunch' },
                                { time: '14.00 - 15.30', program: 'Panel Discussions' },
                                { time: '15.30 - 16.00', program: 'Award Ceremony & Closing' }
                            ],
                            day3: [
                                { time: '9.00 - 10.30', program: 'Networking Session' },
                                { time: '10.30 - 11.00', program: 'Tea/Coffee Break' },
                                { time: '11.00 - 12.30', program: 'Future Trends Workshop' },
                                { time: '12.30 - 13.30', program: 'Lunch' },
                                { time: '13.30 - 15.00', program: 'Final Remarks & Departure' }
                            ]
                        }
                    }
                },
                {
                    key: 'venue',
                    data: {
                        title: 'Conference Venue',
                        name: 'Bern, Switzerland',
                        address: 'Bern, Switzerland',
                        description: 'Bern, the capital of Switzerland, is a UNESCO World Heritage city known for its medieval architecture and world-class research institutions. The city offers an exceptional setting for intellectual exchange and scientific collaboration.',
                        images: [
                            'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1920&q=80',
                            'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80',
                            'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80'
                        ]
                    }
                },
                {
                    key: 'contact',
                    data: {
                        email: 'quantumengineering@sciengasummits.com',
                        phone: '+91 7842090097',
                        whatsapp: '+91 7842090097',
                        address: 'Bern, Switzerland',
                        venue: 'Bern, Switzerland',
                        socialLinks: {
                            facebook: 'https://www.facebook.com/profile.php?id=61588065033161',
                            twitter: '',
                            linkedin: 'https://www.linkedin.com/company/scienga-summits/',
                            instagram: 'https://www.instagram.com/sciengasummits/'
                        }
                    }
                },
                {
                    key: 'marquee',
                    data: {
                        title: 'Supporting Universities & Institutions',
                        items: [
                            'MIT',
                            'Caltech',
                            'ETH Zurich',
                            'University of Cambridge',
                            'Stanford University',
                            'IBM Quantum',
                            'Google Quantum AI',
                            'University of Waterloo',
                            'National University of Singapore',
                            'University of Science and Technology of China'
                        ]
                    }
                }
            ]
        },
        // ?? iqces2026 is the frontend-facing conferenceId used by IQCES2026 site.
        // It mirrors the same content as 'iqces' so both IDs work (the site sends 'iqces2026').
        {
            name: 'iqces2026',
            defaults: [
                { key: 'hero', data: { subtitle: 'INTERNATIONAL CONFERENCE ON', title: 'QUANTUM COMPUTING & ENGINEERING', description: 'The International Conference on Quantum Computing & Engineering (IQCES-2026) unites global experts to shape the future of quantum technologies. Discover ground-breaking quantum algorithms, connect with top quantum professionals, and explore engineering solutions transforming our world.', conferenceDate: 'June 24-26, 2026', venue: 'Bern, Switzerland', countdownTarget: '2026-06-24T09:00:00+02:00', showRegister: true, showAbstract: true, showBrochure: true } },
                { key: 'about', data: { subtitle: 'Welcome to Bern, Switzerland', title: 'About the Conference', paragraph1: 'We are thrilled to welcome you to the International Conference on Quantum Computing & Engineering (IQCES-2026), scheduled to take place from June 24-26, 2026, in the historic city of Bern, Switzerland. This premier scientific gathering brings together global experts from academia and industry to discuss groundbreaking advancements in quantum science.', paragraph2: 'Our mission is to foster a collaborative environment where researchers can share innovative findings, explore the next generation of quantum platforms, and discuss the practical applications of quantum information science. Through interdisciplinary dialogue, we aim to accelerate the transition from quantum theory to industrial reality.', paragraph3: 'Join us for three immersive days of high-level plenary talks, technical sessions, and meaningful networking in the heart of Europe!', objectives: ['Accelerate Innovation: To provide a global stage for showcasing breakthrough research in quantum computing, communication, and metrology.', 'Bridge Research and Industry: To facilitate knowledge transfer between theoretical research and real-world industrial implementation.', 'Foster Collaborative Networks: To connect leading scientists with emerging researchers to build lasting international partnerships.', 'Discuss Ethical and Future Implications: To address the societal and security impacts of emerging quantum technologies.', 'Empower the Next Generation: To support students and early-career researchers through specialized workshops and poster sessions.'], keyThemes: ['Quantum Algorithms and Complexity', 'Quantum Information Processing', 'Quantum Error Correction and Fault Tolerance', 'Quantum Hardware: Superconducting, Trapped Ion, Photonic', 'Quantum Cryptography and Post-Quantum Security', 'Quantum Sensing and Precision Measurements', 'Scalability and Control of Quantum Systems', 'Hybrid Quantum-Classical Systems'] } },
                { key: 'importantDates', data: { dates: [ { month: 'DEC', day: '10', year: '2025', event: 'Abstract Submission Opens', icon: 'CalendarDays' }, { month: 'FEB', day: '15', year: '2026', event: 'Early Bird Deadline', icon: 'CheckCircle' }, { month: 'APR', day: '20', year: '2026', event: 'Final Submission Deadline', icon: 'Clock' }, { month: 'JUN', day: '24', year: '2026', event: 'Conference Start Date', icon: 'Star', sub: 'June 24-26, Bern' } ] } },
                { key: 'stats', data: { title: 'QUANTUM COMPUTING & ENGINEERING SUMMIT APPROACH', items: [ { id: 1, icon: 'Calendar', number: '15+', label: 'Years Experience' }, { id: 2, icon: 'CalendarCheck', number: '100+', label: 'Events' }, { id: 3, icon: 'MapPin', number: '200+', label: 'Onsite Approach' }, { id: 4, icon: 'Mic', number: '2000+', label: 'Speakers' }, { id: 5, icon: 'Users', number: '5000+', label: 'Attendees' }, { id: 6, icon: 'Building2', number: '20+', label: 'Exhibitors' }, { id: 7, icon: 'Globe', number: '150+', label: 'Countries' }, { id: 8, icon: 'Newspaper', number: '2000+', label: 'Publications' } ] } },
                { key: 'contact', data: { email: 'quantumengineering@sciengasummits.com', phone: '+91 7842090097', whatsapp: '+91 7842090097', address: 'Bern, Switzerland', venue: 'Bern, Switzerland', socialLinks: { facebook: 'https://www.facebook.com/profile.php?id=61588065033161', twitter: '', linkedin: 'https://www.linkedin.com/company/scienga-summits/', instagram: 'https://www.instagram.com/sciengasummits/' } } },
                { key: 'sessions', data: { sessions: ['Quantum Algorithms & Complexity', 'Quantum Information Processing', 'Quantum Error Correction & Fault Tolerance', 'Quantum Hardware: Superconducting, Trapped Ion, Photonic', 'Quantum Cryptography & Post-Quantum Security', 'Quantum Sensing & Precision Measurements', 'Scalability & Control of Quantum Systems', 'Hybrid Quantum-Classical Systems', 'Quantum Machine Learning', 'Topological Quantum Computing', 'Photonic Quantum Computing', 'Quantum Networking & Communication', 'Quantum Simulation', 'Post-Quantum Cryptography', 'Industrial Applications of Quantum Technologies'], schedule: { day1: [ { time: '8.30 ? 9.00', program: 'Registration' }, { time: '9.00 ? 9.30', program: 'Conference Inauguration' }, { time: '9.30 ? 11.00', program: 'Plenary Sessions' }, { time: '11.00 ? 11.20', program: 'Tea/Coffee Break' }, { time: '11:20 ? 13.00', program: 'Plenary Sessions' }, { time: '13.00 ? 13.10', program: 'Group Photograph' }, { time: '13.10 ? 14.00', program: 'Lunch' }, { time: '14.00 ? 15.40', program: 'Keynote Sessions' }, { time: '15.40 ? 16.00', program: 'Tea/Coffee Break' }, { time: '16.00 ? 17.30', program: 'Keynote Sessions' }, { time: '17.30 ? 18.30', program: 'Workshop' } ], day2: [ { time: '9.00 ? 10.30', program: 'Scientific Sessions' }, { time: '10.30 ? 10.50', program: 'Tea/Coffee Break' }, { time: '10.50 ? 13.00', program: 'Poster Presentations' }, { time: '13.00 ? 14.00', program: 'Lunch' }, { time: '14.00 ? 15.30', program: 'Panel Discussions' }, { time: '15.30 ? 16.00', program: 'Award Ceremony & Closing' } ], day3: [ { time: '9.00 ? 10.30', program: 'Networking Session' }, { time: '10.30 ? 11.00', program: 'Tea/Coffee Break' }, { time: '11.00 ? 12.30', program: 'Future Trends Workshop' }, { time: '12.30 ? 13.30', program: 'Lunch' }, { time: '13.30 ? 15.00', program: 'Final Remarks & Departure' } ] } } },
                { key: 'pricing', data: { title: 'REGISTRATION PRICING', packages: [ { title: 'Speaker', price: '749', currency: 'USD', features: ['Oral Presentation', 'Networking with Fellow Speakers', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks'] }, { title: 'Delegate', price: '899', currency: 'USD', features: ['Delegate Opportunities', 'Connect with Fellow Delegates', 'E-Abstract Book', 'Certificate of Attendance', 'Conference Schedule Handout', 'Access to All Sessions and Workshops', 'Lunch and Coffee Breaks'] }, { title: 'Virtual', price: '199', currency: 'USD', features: ['Online Access to All Sessions', 'Digital Certificate', 'E-Abstract Book', 'Q&A Participation', 'Recorded Session Access'] } ] } },
                { key: 'registration-prices', data: { earlyBirdEndDate: '2026-02-15', standardEndDate: '2026-04-20', onspotEndDate: '2026-06-24', categories: [ { id: 'speaker', label: 'Speaker Registration', early: 749, standard: 849, onspot: 949 }, { id: 'delegate', label: 'Delegate Registration', early: 899, standard: 999, onspot: 1099 }, { id: 'poster', label: 'Poster Registration', early: 449, standard: 549, onspot: 649 }, { id: 'student', label: 'Student', early: 299, standard: 399, onspot: 499 }, { id: 'virtual', label: 'Virtual (Online)', early: 199, standard: 249, onspot: 299 } ], sponsorships: [ { id: 'platinum', label: 'Platinum Sponsor', price: 4999 }, { id: 'diamond', label: 'Diamond Sponsor', price: 3999 }, { id: 'gold', label: 'Gold Sponsor', price: 2999 }, { id: 'exhibitor', label: 'Exhibitor', price: 1999 } ], accommodation: [ { nights: 2, single: 360, double: 400, triple: 440 }, { nights: 3, single: 540, double: 600, triple: 660 }, { nights: 4, single: 720, double: 800, triple: 880 }, { nights: 5, single: 900, double: 1000, triple: 1100 } ], accompanyingPersonPrice: 249, processingFeePercent: 5 } },
                { key: 'faq', data: { categories: [ { title: 'Conference Information', questions: [ { q: 'When and where is IQCES 2026?', a: 'June 24-26, 2026 in Bern, Switzerland.' }, { q: 'Who should attend?', a: 'Researchers, engineers, and industry professionals in quantum computing and related fields.' } ] }, { title: 'Registration', questions: [ { q: 'How do I register?', a: 'Complete the online registration form on our website.' }, { q: 'What is the early bird deadline?', a: 'February 15, 2026.' } ] } ] } },
                { key: 'venue', data: { title: 'Conference Venue', name: 'Bern, Switzerland', address: 'Bern, Switzerland', description: 'Bern, the capital of Switzerland, is a UNESCO World Heritage city known for its medieval architecture and world-class research institutions.', images: [ 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1920&q=80', 'https://images.unsplash.com/photo-1540575861501-7ad05823c93e?w=1920&q=80', 'https://images.unsplash.com/photo-1512470876302-972fad2aa9dd?w=1920&q=80' ] } },
                { key: 'brochure', data: { pdfUrl: '', title: 'International Conference on Quantum Computing & Engineering (IQCES-2026)', note: '* PDF will be available soon. Format: PDF' } },
                { key: 'marquee', data: { title: 'Supporting Universities & Institutions', items: ['MIT', 'Caltech', 'ETH Zurich', 'University of Cambridge', 'Stanford University', 'IBM Quantum', 'Google Quantum AI', 'University of Waterloo', 'National University of Singapore', 'University of Science and Technology of China'] } }
            ]
        }
    ];

    // Keys whose DEFAULT fields should be merged in if missing
export { conferences };
