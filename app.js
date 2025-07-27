// Developer Portfolio JavaScript - Terminal Dark & Clean Light Theme System

document.addEventListener('DOMContentLoaded', function() {
    console.log('Developer Portfolio initialized');
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize other components after a short delay
    setTimeout(() => {
        applyTheme('dark'); // Force dark theme
        initNavigation();
        initScrollEffects();
        initContactForm();
        initCaseStudyModals();
        updateActiveNavLink();
        initTextRotationAnimation();
        initEnhancedAnimations();
        
        // Hide loading screen
        hideLoadingScreen();
    }, 2000);
});

/************************************
 * Loading Screen                   *
 ************************************/
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingMessage = document.querySelector('.loading-message');
    
    if (!loadingScreen || !loadingMessage) return;
    
    const messages = [
        'Initializing Portfolio...',
        'Loading Projects...',
        'Preparing Experience...',
        'Setting up Animations...',
        'Almost Ready...'
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length - 1) {
            messageIndex++;
            loadingMessage.textContent = messages[messageIndex];
        } else {
            clearInterval(messageInterval);
        }
    }, 400);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

/************************************
 * Theme System              *
 ************************************/
function applyTheme(theme) {
    const body = document.body;
    const html = document.documentElement;
    
    // Apply new theme
    if (theme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        html.setAttribute('data-theme', 'dark');
    }
    
    // Update meta theme color
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
    }
    meta.content = '#0A0A0A';
}

/************************************
 * Navigation & Smooth Scrolling    *
 ************************************/
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    
                    // Reset hamburger
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = '';
                        span.style.opacity = '';
                    });
                }
            }
        });
    });

    function scrollToSection(hash) {
        try {
            const section = document.querySelector(hash);
            if (!section) {
                console.warn('Section not found:', hash);
                return;
            }
            
            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 80;
            const top = section.offsetTop - offset - 20;
            
            window.scrollTo({
                top: Math.max(0, top),
                behavior: 'smooth'
            });
            
            console.log('Scrolled to section:', hash);
        } catch (error) {
            console.error('Error scrolling to section:', error);
        }
    }
}

/************************************
 * Active Navigation Link           *
 ************************************/
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    function updateActive() {
        let current = '';
        const scrollPos = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActive);
    updateActive(); // Run once on load
}

/************************************
 * Scroll Effects                   *
 ************************************/
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolling
        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll (for mobile)
        if (window.innerWidth <= 768) {
            if (Math.abs(currentScroll - lastScroll) > 10) {
                if (currentScroll > lastScroll && currentScroll > 150) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Fade in animations on scroll
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-item, .hero-content, .about-content'
    );
    animatedElements.forEach(el => observer.observe(el));
}

/************************************
 * Case Study Data                  *
 ************************************/
function getCaseStudies() {
    return {
        'nexusone': {
            title: 'NexusOne – Unified Integration Monitoring and Remediation Platform',
            content: `
                <div class="case-study-section">
                    <img src="CaseStudy/NexusOne.png" alt="NexusOne Integration Architecture" style="width:100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>NexusOne – Unified Integration Monitoring and Remediation Platform</h3>
                </div>
                <div class="case-study-section">
                    <h4>Overview</h4>
                    <p>NexusOne empowers business and IT users with comprehensive visibility and control over their system integrations. The platform delivers real-time monitoring, advanced analytics, and error remediation—addressing operational continuity, data integrity, and efficient decision-making from a single, user-friendly portal. NexusOne is tailored to drive visibility, efficiency, and confidence in complex integration landscapes.</p>
                </div>
                <div class="case-study-section">
                    <h4>Business Challenges</h4>
                    <ul>
                        <li><strong>Fragmented Integration Monitoring:</strong> Integrations span multiple platforms and tools, making it hard for IT and business teams to attain unified, actionable oversight.</li>
                        <li><strong>Delayed Error Remediation:</strong> Limited capabilities to promptly detect and resolve errors, especially within third-party systems, result in increased downtime and operational risks.</li>
                        <li><strong>Ineffective Reporting:</strong> Lack of advanced analytics and reporting hampers root cause analysis and informed strategic planning.</li>
                        <li><strong>Operational Inefficiencies:</strong> Manual monitoring and troubleshooting consume valuable resources and slow business response times.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Solution</h4>
                    <p>NexusOne delivers a holistic integration management solution with these core features:</p>
                    <h5>1. Real-Time Integration Monitoring</h5>
                    <ul>
                        <li>Consolidates data from all connected systems, providing unified dashboards for end-to-end viewing of integration health across platforms.</li>
                    </ul>
                    <h5>2. Advanced Reporting and Analytics</h5>
                    <ul>
                        <li>Delivers deep, actionable insights into usage, performance, and error patterns, helping stakeholders proactively address integration issues.</li>
                    </ul>
                    <h5>3. Error Remediation for Third-Party Systems</h5>
                    <ul>
                        <li>Enables direct error identification and correction—minimizing resolution times, avoiding escalations, and supporting self-service interventions where possible.</li>
                    </ul>
                    <h5>4. Comprehensive Auditing</h5>
                    <ul>
                        <li>Maintains full audit trails of all integration activities and remediation actions, supporting compliance requirements and post-incident investigation.</li>
                    </ul>
                    <h5>5. User-Centric Design</h5>
                    <ul>
                        <li>Customizable dashboards and intuitive controls make the platform accessible for both technical teams and business users.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Technologies Used</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Component/Technology</th>
                                <th>Purpose / Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>NexusOne Platform</strong></td><td>Centralized integration monitoring and management</td></tr>
                            <tr><td><strong>Analytics Engine</strong></td><td>Advanced reporting and trend analysis</td></tr>
                            <tr><td><strong>Remediation Module</strong></td><td>Self-service and automated error correction</td></tr>
                            <tr><td><strong>Unified Dashboard</strong></td><td>Real-time visualization for health and usage</td></tr>
                            <tr><td><strong>Audit Logging</strong></td><td>Traceable integration and remediation records</td></tr>
                            <tr><td><strong>APIs/Connectors</strong></td><td>Multi-platform system connectivity</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="case-study-section">
                    <h4>Business Impacts</h4>
                    <ul>
                        <li><strong>Operational Continuity:</strong> Proactive alerts and error resolution maintain high integration uptime and mitigate business disruption.</li>
                        <li><strong>Data Integrity:</strong> Consistent real-time monitoring and remediation uphold reliable data flows across connected systems.</li>
                        <li><strong>Resource Efficiency:</strong> Self-service interfaces and automation reduce manual interventions and accelerate response times.</li>
                        <li><strong>Improved Strategic Decision-Making:</strong> Actionable analytics empower teams to identify trends, optimize integrations, and focus on value-added initiatives.</li>
                        <li><strong>Enhanced Compliance & Governance:</strong> Full auditability supports regulatory requirements and boosts audit readiness.</li>
                        <li><strong>Empowered Business Users:</strong> Business teams can view, analyze, and resolve integration issues independently, increasing agility and service quality.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Success Metrics</h4>
                    <ul>
                        <li><strong>Self-Service Error Resolution Rate:</strong> Measures the percentage of errors resolved directly by users without IT escalation.</li>
                        <li><strong>Integration Health Scores:</strong> Aggregate metrics reflecting system uptime, performance, and error frequency.</li>
                        <li><strong>Operational Efficiency Gains:</strong> Reduction in mean time to detect (MTTD) and mean time to resolve (MTTR) integration issues.</li>
                    </ul>
                </div>
            `
        },
        'azure-automation': {
            title: 'Azure Automation as a Service: Infrastructure Provisioning Revolution',
            content: `
                <div class="case-study-section">
                    <img src="CaseStudy/Azure Automation as a Service.png" alt="Azure Automation as a Service Architecture" style="width:100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>CSmart – Azure Automation as a Service</h3>
                </div>
                <div class="case-study-section">
                    <h4>Overview</h4>
                    <p>CSmart (Cloud-Secured Managed Automated Tool) is an Azure cloud management platform designed to simplify and automate the monitoring, optimization, and governance of cloud resources. Acting as an integrated dashboard, it enables businesses to manage hundreds of Azure resources across multiple subscriptions through a single, user-friendly interface. CSmart empowers organizations to efficiently automate reporting, improve cost visibility, enforce compliance, and enhance resource health monitoring.</p>
                </div>
                <div class="case-study-section">
                    <h4>Business Challenges</h4>
                    <ul>
                        <li><strong>Complex Azure Environments:</strong> Difficulty managing and monitoring hundreds of resources spread across numerous subscriptions and groups.</li>
                        <li><strong>Data Overload:</strong> Manual aggregation and transformation of telemetry and configuration data from disparate sources were effort-intensive and inefficient.</li>
                        <li><strong>Insufficient Automation:</strong> Deployment, monitoring, and reporting tasks often required custom solutions, limiting scalability and increasing risks.</li>
                        <li><strong>Limited Visibility and Optimization:</strong> Suboptimal discoverability of assets, restricted out-of-the-box monitoring, and basic cost management capabilities.</li>
                        <li><strong>Compliance Risks:</strong> Lack of unified policy enforcement and auditability for Azure resources increased compliance challenges.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Solution</h4>
                    <p>CSmart delivers a comprehensive solution with the following capabilities:</p>
                    <h5>1. Unified Monitoring and Management</h5>
                    <ul>
                        <li>Centralizes monitoring for PaaS, IaaS, storage, networking, and application resources (e.g., VMs, SQL, Function Apps, Service Bus, Key Vault).</li>
                        <li>Allows resource control actions (start/stop/delete/tag) directly from the dashboard.</li>
                        <li>Visualizes deployments and offers resource categorization by compute, storage, networking, and PaaS types.</li>
                    </ul>
                    <h5>2. Application Health & Resource Status</h5>
                    <ul>
                        <li>Real-time dashboards with granular health metrics (Healthy/Warning/Critical), customizable response code-based rules, and drill-down for diagnostics.</li>
                        <li>Detailed application and API performance monitoring, including response times and top error analysis.</li>
                        <li>Extensible alerting via email, Teams, and Slack.</li>
                    </ul>
                    <h5>3. Resource Status Board</h5>
                    <ul>
                        <li>Health status for resources (VM, SQL, etc.) based on customizable thresholds.</li>
                        <li>Advisory recommendations and notification triggers for critical and warning states.</li>
                        <li>Drill-through views with detailed resource metrics and configurations.</li>
                    </ul>
                    <h5>4. Cost Monitoring & Optimization</h5>
                    <ul>
                        <li>Near real-time visualization of actual/forecast costs and top cost drivers at resource group and type levels.</li>
                        <li>Cost recommendations surfaced through Power BI with impact status (High/Medium/Low) and resource-level details.</li>
                    </ul>
                    <h5>5. Automated Deployment and Governance</h5>
                    <ul>
                        <li>Automated single-click deployment of standalone and blueprint resources, integrating CI/CD via Azure DevOps and Terraform scripts.</li>
                        <li>Blueprints for complex architectures, including infrastructure-as-code support and landing zones.</li>
                        <li>Policy-based compliance enforcement, identity management, and audit logging for governance.</li>
                    </ul>
                    <h5>6. Network & Security Management</h5>
                    <ul>
                        <li>Automated hybrid setup (VPN, ExpressRoute, firewalls), network peering, and security recommendations.</li>
                        <li>Central platform for network configuration and monitoring.</li>
                    </ul>
                    <h5>7. Extensible Reporting</h5>
                    <ul>
                        <li>Power BI integration for advanced reporting, custom dashboards, and role-based views (RLS).</li>
                        <li>API-based and Angular-driven report delivery.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Technologies Used</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Technology</th>
                                <th>Use Case / Functionality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>CSmart Platform</strong></td><td>Centralized Azure management and automation</td></tr>
                            <tr><td><strong>Azure Monitor</strong></td><td>Telemetry collection and analysis</td></tr>
                            <tr><td><strong>Azure Data Explorer</strong></td><td>Near real-time data ingestion/querying</td></tr>
                            <tr><td><strong>Event Hub</strong></td><td>Event/log streaming pipeline</td></tr>
                            <tr><td><strong>Power BI</strong></td><td>Custom dashboards, reporting, and visualization</td></tr>
                            <tr><td><strong>Azure DevOps</strong></td><td>CI/CD automation, blueprint deployment</td></tr>
                            <tr><td><strong>Terraform</strong></td><td>Infrastructure-as-Code deployments</td></tr>
                            <tr><td><strong>Azure Policy</strong></td><td>Compliance and governance enforcement</td></tr>
                            <tr><td><strong>Azure Firewall/VNet</strong></td><td>Network and security management</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="case-study-section">
                    <h4>Business Impacts</h4>
                    <ul>
                        <li><strong>Reduced Cloud Management Overhead:</strong> Streamlines discovery, tracking, and management of Azure assets across all subscriptions and groups.</li>
                        <li><strong>Greater Cost Control:</strong> Actionable insights and automated recommendations drive cost savings and rationalized cloud spending.</li>
                        <li><strong>Enhanced Observability and Uptime:</strong> Real-time, drillable health and performance dashboards promote proactive action and minimize downtime.</li>
                        <li><strong>Operational Agility:</strong> Rapid resource deployment, scalable automation, and simple interfaces empower faster project delivery.</li>
                        <li><strong>Improved Compliance and Security:</strong> Centralized policy management, audit trails, and automated governance reduce operational risks.</li>
                        <li><strong>User Empowerment:</strong> Business users can leverage Power BI analytics and tailored dashboards for faster decision-making.</li>
                    </ul>
                </div>
            `
        },
        'marketplace-integration': {
            title: 'Unified Cloud Marketplace Listing – WorkSpan',
            content: `
                <div class="case-study-section">
                    <h4>Overview</h4>
                    <p>WorkSpan streamlines the process of listing SaaS products across the major public cloud marketplaces: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). By enabling a single platform for marketplace integration, offer management, and listing automation, WorkSpan empowers organizations to efficiently scale their presence, reach new customers, and optimize cloud go-to-market (GTM) operations.</p>
                </div>
                <div class="case-study-section">
                    <h4>Business Challenges</h4>
                    <ul>
                        <li><strong>Complex Multi-Cloud Listings:</strong> Each marketplace (AWS, Azure, GCP) has its own onboarding, technical, and compliance requirements, making multi-cloud listing manual and error-prone.</li>
                        <li><strong>Operational Inefficiency:</strong> Manual tracking, product content updates, and API integration for each cloud hinder speed and scalability.</li>
                        <li><strong>Resource Constraints:</strong> Significant time and skilled resources required to build and maintain technical integrations for cross-cloud marketplace listings.</li>
                        <li><strong>Lack of Unified Visibility:</strong> Separate dashboards and processes for each cloud create overhead in managing offers, customer subscriptions, and performance reporting.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Solution</h4>
                    <p>WorkSpan's Marketplace Accelerator and ecosystem-led platform deliver:</p>
                    <h5>1. Unified Listing Management</h5>
                    <ul>
                        <li>Centralized portal and single point of contact for listing products across AWS, Azure, and GCP Marketplaces.</li>
                        <li>Use of a standardized product load form for fast data entry by customers in layman's terms.</li>
                    </ul>
                    <h5>2. Managed Technical Integration</h5>
                    <ul>
                        <li>Automated deployment scripts and templates to provision the required technical architecture for each marketplace.</li>
                        <li>Dedicated team oversees marketplace communications, listing setup, and end-to-end technical integration.</li>
                    </ul>
                    <h5>3. Seamless Customer Onboarding</h5>
                    <ul>
                        <li>Self-service, customer-friendly workflows that minimize manual errors.</li>
                        <li>Support for customer registration and entitlement flows—API-driven, compliant, and market-specific (e.g., DynamoDB and Lambda for AWS).</li>
                    </ul>
                    <h5>4. Marketplace Compliance & Testing</h5>
                    <ul>
                        <li>Conducts simulation, end-to-end testing, and validation before go-live.</li>
                        <li>Ensures all listings adhere to each hyperscaler's requirements, including offer structures and legal contracts.</li>
                    </ul>
                    <h5>5. Real-Time Management & Analytics</h5>
                    <ul>
                        <li>Monitors active listings, measures performance, and provides actionable insights via dashboards.</li>
                        <li>Automated notifications and reminders for customers and internal teams.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Technologies Used</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Platform / Component</th>
                                <th>Functionality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>WorkSpan Platform</strong></td><td>Central portal for offer management and automation</td></tr>
                            <tr><td><strong>AWS Lambda, DynamoDB</strong></td><td>Marketplace onboarding, customer flows, entitlement API</td></tr>
                            <tr><td><strong>Azure Marketplace Integration</strong></td><td>Custom ARM templates, API connectors, listing automation</td></tr>
                            <tr><td><strong>GCP Marketplace Integration</strong></td><td>Standardized onboarding and offer setup scripts</td></tr>
                            <tr><td><strong>APIs & Webhooks</strong></td><td>Event-driven customer and entitlement notifications</td></tr>
                            <tr><td><strong>Workflow Automation</strong></td><td>Streamlines onboarding, technical validation, and tracking</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="case-study-section">
                    <h4>Business Impacts</h4>
                    <ul>
                        <li><strong>Faster Time-to-Market:</strong> Automation and "white-glove" onboarding help reduce marketplace listing timelines from weeks to days.</li>
                        <li><strong>Reduced Complexity:</strong> A single team manages everything from customer onboarding to ongoing offer management, minimizing resource requirements.</li>
                        <li><strong>Increased Reach & Revenue:</strong> Unified listing on AWS, Azure, and GCP expands the customer base and leverages the credibility of all three hyperscalers.</li>
                        <li><strong>Operational Efficiency:</strong> Eliminates duplicate processes, boosts compliance, and ensures continuous integration with CRM systems.</li>
                        <li><strong>Customer Satisfaction:</strong> Smooth onboarding and entitlement workflows improve the user experience and drive higher adoption.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Implementation Screenshots</h4>
                    <div style="display: grid; gap: 20px; margin-top: 20px;">
                        <div>
                            <img src="CaseStudy/MKP/Screenshot 2025-07-26 043736.png" alt="WorkSpan Marketplace Platform Dashboard" style="width:100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        </div>
                        <div>
                            <img src="CaseStudy/MKP/Screenshot 2025-07-26 043817.png" alt="Multi-Cloud Marketplace Integration Interface" style="width:100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        </div>
                        <div>
                            <img src="CaseStudy/MKP/Screenshot 2025-07-26 043847.png" alt="Offer Management and Analytics Portal" style="width:100%; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        </div>
                    </div>
                </div>
            `
        },
        'biztalk-modernization': {
            title: 'BizTalk-to-AIS Modernization: Legacy Infrastructure Transformation',
            content: `
                <div class="case-study-section">
                    <img src="CaseStudy/Biztalk architechure.png" alt="BizTalk to AIS Migration Architecture" style="width:100%; border-radius: 8px; margin-bottom: 20px;">
                </div>
                <div class="case-study-section">
                    <h4>Overview</h4>
                    <p>Migrating from Microsoft BizTalk Server to Azure Integration Services (AIS) represents a strategic step for organizations seeking to modernize their integration landscape. With BizTalk versions approaching end of support and businesses demanding more agility, scalability, and cost optimization, Azure offers a cloud-native, future-proof platform for all your integration needs.</p>
                </div>
                <div class="case-study-section">
                    <h4>Business Challenges</h4>
                    <ul>
                        <li><strong>High Maintenance & Costly Infrastructure:</strong> Legacy BizTalk systems require specialized expertise, regular upkeep, and significant investments in hardware, licensing, and management.</li>
                        <li><strong>Limited Scalability:</strong> Adapting to rapidly changing business demands or high transaction volumes is cumbersome and resource-intensive on-premises.</li>
                        <li><strong>Legacy Technology & Shrinking Talent Pool:</strong> With BizTalk server versions nearing end-of-life, organizations face risks around innovation, long-term support, and the availability of skilled professionals.</li>
                        <li><strong>Complex Integration & Limited Monitoring:</strong> Legacy integration patterns, limited API/connectivity options, and basic monitoring tools slow down innovation and troubleshooting.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Solution</h4>
                    <p><strong>Azure Integration Services (AIS) delivers a modern, serverless, and scalable platform that addresses all critical pain points:</strong></p>
                    <ul>
                        <li><strong>Seamless Migration:</strong> Structured migration strategy covering discovery, assessment, design, testing, and phased cutover, ensuring business continuity.</li>
                        <li><strong>Comprehensive Integration Suite:</strong> Replace BizTalk orchestrations and messaging with Azure Logic Apps, Service Bus, API Management, Event Grid, and Azure Functions.</li>
                        <li><strong>Pay-as-You-Go & Scalability:</strong> Eliminate wasted spend with serverless, pay-for-what-you-use architecture. Dynamically scale to meet any workload or transaction volume.</li>
                        <li><strong>Advanced Security & Compliance:</strong> Benefit from built-in data encryption, Azure Active Directory integration, and compliance with global and industry standards.</li>
                        <li><strong>Enhanced Monitoring & Optimization:</strong> Real-time insights, diagnostics, and proactive alerting via Azure Monitor and Application Insights for efficient operations and troubleshooting.</li>
                        <li><strong>Future-Proofed:</strong> Continuous feature updates, integration with AI/ML/IoT services, and global reach with Azure data centers.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Technologies Used</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Azure Service</th>
                                <th>Functionality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Logic Apps</strong></td><td>Visual workflow automation (orchestration)</td></tr>
                            <tr><td><strong>Azure Functions</strong></td><td>Serverless event-driven compute</td></tr>
                            <tr><td><strong>Service Bus</strong></td><td>Advanced message queueing & pub/sub</td></tr>
                            <tr><td><strong>Event Grid & Hub</strong></td><td>Event-driven data integration at scale</td></tr>
                            <tr><td><strong>API Management</strong></td><td>Secure API gateway with analytics</td></tr>
                            <tr><td><strong>Azure Monitor</strong></td><td>Comprehensive performance monitoring & diagnostics</td></tr>
                            <tr><td><strong>Azure Key Vault</strong></td><td>Secure secrets, keys, and certificates management</td></tr>
                            <tr><td><strong>Azure DevOps</strong></td><td>CI/CD pipelines for automated deployment</td></tr>
                            <tr><td><strong>Azure SQL Database</strong></td><td>Scalable relational data storage</td></tr>
                            <tr><td><strong>Azure Storage</strong></td><td>Cloud storage for structured & unstructured data</td></tr>
                            <tr><td><strong>ExpressRoute/VNet</strong></td><td>Hybrid/private connectivity with on-premises systems</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="case-study-section">
                    <h4>Business Impacts</h4>
                    <ul>
                        <li><strong>Cost Savings:</strong> Average cost reduction by eliminating hardware/licensing expenses and optimizing resource utilization.</li>
                        <li><strong>Agility and Faster Time-to-Market:</strong> Rapid development and deployment of new integrations via modern, visual tools and pre-built connectors.</li>
                        <li><strong>Scalability:</strong> Instantly scale up or down without infrastructure constraints, serving a global audience with low latency.</li>
                        <li><strong>Improved Reliability & Continuity:</strong> Built-in disaster recovery, geo-redundancy, and automated monitoring ensure business-critical integrations stay available.</li>
                        <li><strong>Future-Readiness:</strong> Stay competitive with the latest cloud innovations and security standards, protecting your technology investment.</li>
                    </ul>
                </div>
            `
        },
        'sap-vm-quality-check': {
            title: 'SAP VM Quality Check – Q-Smart',
            content: `
                <div class="case-study-section">
                    <img src="CaseStudy/sap.png" alt="Q-Smart SAP VM Quality Check Architecture" style="width:100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>SAP VM Quality Check – Q-Smart</h3>
                </div>
                <div class="case-study-section">
                    <h4>Overview</h4>
                    <p>Q-Smart is a specialized quality check solution developed for SAP Virtual Machines (VMs), designed to automate and streamline compliance validation for SAP environments. The platform combines an intuitive user interface, automated PowerShell scripting, robust reporting, and secure document delivery to enhance quality assurance processes for both SAP and private VMs.</p>
                </div>
                <div class="case-study-section">
                    <h4>Business Challenges</h4>
                    <ul>
                        <li><strong>Manual Quality Checks Are Time-Consuming:</strong> Traditionally, VM validation against SAP standards is manual, error-prone, and slows down operational timelines.</li>
                        <li><strong>Lack of User-Friendly Interfaces:</strong> Complexity in capturing comprehensive VM details and initiating checks presents usability hurdles.</li>
                        <li><strong>Inconsistent or Incomplete Validation:</strong> Variability in checks due to manual operations compromises the reliability of SAP VM quality status.</li>
                        <li><strong>Reporting & Traceability Gaps:</strong> Absence of automated documentation hinders auditability and user feedback.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Solution</h4>
                    <p>Q-Smart addresses the above issues through:</p>
                    <h5>1. Intuitive User Interface</h5>
                    <ul>
                        <li>Easy data entry for VM information: name, OS, CPU, and other relevant specs.</li>
                        <li>Minimal fields to reduce input error and speed up quality check initiation.</li>
                    </ul>
                    <h5>2. Automated PowerShell Quality Checks</h5>
                    <ul>
                        <li>Dynamically generates a PowerShell script tailored to the entered VM information.</li>
                        <li>Adapts commands to meet both standard and custom SAP quality check requirements.</li>
                        <li>Connects with private VMs as required via peering for complete info gathering.</li>
                    </ul>
                    <h5>3. Automated Execution & Feedback</h5>
                    <ul>
                        <li>Executes the script to run all necessary checks on the specified VM.</li>
                        <li>Stores results in a secure Azure Storage Account for centralized access.</li>
                    </ul>
                    <h5>4. Comprehensive PDF Reporting</h5>
                    <ul>
                        <li>Generates a detailed PDF report on all test outcomes, compliant with SAP standards.</li>
                        <li>Reports are stored securely with automated SAS URL (time-bound secure access).</li>
                    </ul>
                    <h5>5. Automated, Secure Distribution</h5>
                    <ul>
                        <li>Sends the downloadable report link directly to the user's email.</li>
                        <li>Ensures only authorized access to sensitive validation data.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Technologies Used</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Technology</th>
                                <th>Purpose / Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Q-Smart App</strong></td><td>User interface for data input and operations</td></tr>
                            <tr><td><strong>PowerShell</strong></td><td>Scripting for SAP VM quality checks</td></tr>
                            <tr><td><strong>Azure VM & Networking</strong></td><td>Hosting frontend/backend and secure peering</td></tr>
                            <tr><td><strong>Azure Storage Account</strong></td><td>Stores generated PDF reports securely</td></tr>
                            <tr><td><strong>Azure Logic Apps</strong></td><td>Orchestrates report generation and email delivery</td></tr>
                            <tr><td><strong>PDF Library</strong></td><td>Converts script results into structured PDF</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="case-study-section">
                    <h4>Business Impacts</h4>
                    <ul>
                        <li><strong>Faster, Easier SAP VM Validation:</strong> User-centric forms and automation greatly reduce the time and effort for quality checks.</li>
                        <li><strong>Higher Quality & Compliance:</strong> Consistent, standards-aligned checks minimize human errors and ensure reliable results.</li>
                        <li><strong>Comprehensive Documentation:</strong> Automated, professional PDF reports enhance auditability and stakeholder trust.</li>
                        <li><strong>Secure & Convenient Access:</strong> Reports are securely stored and accessible via unique, time-limited links.</li>
                        <li><strong>Improved User Experience:</strong> Seamless integration of UI, backend, and delivery creates a positive workflow for all stakeholders.</li>
                    </ul>
                </div>
            `
        },
        'cloud-migration': {
            title: 'Cloud Migration & API Management: Secure Azure Infrastructure Transformation',
            content: `
                <div class="case-study-section">
                    <img src="CaseStudy/airindia.png" alt="Azure Cloud Migration Technical Architecture" style="width:100%; border-radius: 8px; margin-bottom: 20px;">
                    <h3>Cloud Migration & API Management: Secure Azure Infrastructure Transformation</h3>
                </div>
                <div class="case-study-section">
                    <h4>Overview</h4>
                    <p>This comprehensive cloud migration project transformed legacy on-premises infrastructure to a secure, scalable Azure cloud environment. The solution features enterprise-grade API management, multi-tier security architecture, and automated deployment pipelines, enabling improved performance, security, and operational efficiency for mission-critical enterprise applications.</p>
                </div>
                <div class="case-study-section">
                    <h4>Business Challenges</h4>
                    <ul>
                        <li><strong>Legacy Infrastructure Limitations:</strong> Aging on-premises systems with limited scalability and high maintenance costs.</li>
                        <li><strong>Security and Compliance Requirements:</strong> Need for enterprise-grade security, network isolation, and compliance with industry standards.</li>
                        <li><strong>API Management Complexity:</strong> Scattered API endpoints requiring centralized management, monitoring, and security.</li>
                        <li><strong>Operational Inefficiency:</strong> Manual deployment processes and limited monitoring capabilities affecting business agility.</li>
                        <li><strong>Disaster Recovery Gaps:</strong> Insufficient backup and recovery mechanisms for business continuity.</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Solution Architecture</h4>
                    <p>The solution implements a comprehensive Azure cloud architecture featuring:</p>
                    <h5>1. Multi-Tier Security Framework</h5>
                    <ul>
                        <li>Azure Application Gateway with Web Application Firewall (WAF) for L7 protection</li>
                        <li>Network Security Groups (NSGs) for granular traffic control</li>
                        <li>Azure Firewall for centralized network security management</li>
                        <li>Private endpoints and service endpoints for secure connectivity</li>
                    </ul>
                    <h5>2. API Management Platform</h5>
                    <ul>
                        <li>Azure API Management (APIM) for centralized API governance</li>
                        <li>Rate limiting, throttling, and authentication policies</li>
                        <li>Developer portal for API documentation and testing</li>
                        <li>API versioning and lifecycle management</li>
                    </ul>
                    <h5>3. Scalable Compute Infrastructure</h5>
                    <ul>
                        <li>Azure App Services for web applications with auto-scaling</li>
                        <li>Azure Functions for serverless compute workloads</li>
                        <li>Container instances for microservices architecture</li>
                        <li>Load balancers for high availability and distribution</li>
                    </ul>
                    <h5>4. Data Platform & Storage</h5>
                    <ul>
                        <li>Azure SQL Database with automated backups and geo-replication</li>
                        <li>Azure Storage for blob, file, and queue storage needs</li>
                        <li>Azure Cosmos DB for globally distributed applications</li>
                        <li>Data encryption at rest and in transit</li>
                    </ul>
                    <h5>5. Monitoring & Observability</h5>
                    <ul>
                        <li>Azure Monitor for comprehensive application and infrastructure monitoring</li>
                        <li>Application Insights for application performance management</li>
                        <li>Log Analytics for centralized log management</li>
                        <li>Azure Sentinel for security information and event management (SIEM)</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Technologies Used</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Technology</th>
                                <th>Purpose / Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Azure Application Gateway</strong></td><td>L7 load balancing and Web Application Firewall</td></tr>
                            <tr><td><strong>Azure API Management</strong></td><td>Centralized API governance and management</td></tr>
                            <tr><td><strong>Azure App Service</strong></td><td>Hosting web applications and APIs</td></tr>
                            <tr><td><strong>Azure SQL Database</strong></td><td>Managed relational database service</td></tr>
                            <tr><td><strong>Azure Active Directory</strong></td><td>Identity and access management</td></tr>
                            <tr><td><strong>Azure Key Vault</strong></td><td>Secrets and certificate management</td></tr>
                            <tr><td><strong>Azure DevOps</strong></td><td>CI/CD pipelines and deployment automation</td></tr>
                            <tr><td><strong>Azure Monitor</strong></td><td>Comprehensive monitoring and alerting</td></tr>
                            <tr><td><strong>Azure Firewall</strong></td><td>Network security and traffic filtering</td></tr>
                            <tr><td><strong>Azure Virtual Network</strong></td><td>Network isolation and connectivity</td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="case-study-section">
                    <h4>Implementation Highlights</h4>
                    <ul>
                        <li><strong>Zero-Downtime Migration:</strong> Phased migration approach with blue-green deployment strategy</li>
                        <li><strong>Infrastructure as Code:</strong> ARM templates and Terraform for consistent deployments</li>
                        <li><strong>Security by Design:</strong> Implemented defense-in-depth security model from day one</li>
                        <li><strong>Automated Testing:</strong> Comprehensive testing suite including security and performance tests</li>
                        <li><strong>Disaster Recovery:</strong> Multi-region setup with automated failover capabilities</li>
                    </ul>
                </div>
                <div class="case-study-section">
                    <h4>Business Impacts</h4>
                    <ul>
                        <li><strong>Improved Performance:</strong> 40% reduction in application response times through optimized architecture and CDN integration</li>
                        <li><strong>Enhanced Security:</strong> Multi-layered security approach reducing security incidents by 75%</li>
                        <li><strong>Cost Optimization:</strong> 30% reduction in infrastructure costs through right-sizing and reserved instances</li>
                        <li><strong>Increased Agility:</strong> Automated CI/CD pipelines reducing deployment time from days to minutes</li>
                        <li><strong>Better Scalability:</strong> Auto-scaling capabilities handling 10x traffic spikes during peak periods</li>
                        <li><strong>Improved Compliance:</strong> Built-in compliance features meeting industry regulatory requirements</li>
                        <li><strong>Enhanced Monitoring:</strong> 99.9% uptime through proactive monitoring and automated remediation</li>
                    </ul>
                </div>
            `
        }
    };
}

/************************************
 * Case Study Modal                 *
 ************************************/
function initCaseStudyModals() {
    console.log('Initializing case study modals...');
    
    const modal = document.getElementById('caseStudyModal');
    const titleEl = document.getElementById('modalTitle');
    const bodyEl = document.getElementById('modalBody');
    const closeBtn = document.getElementById('closeModal');
    
    if (!modal || !titleEl || !bodyEl || !closeBtn) {
        console.error('Modal elements not found:', { modal, titleEl, bodyEl, closeBtn });
        return;
    }
    
    console.log('Modal elements found successfully');
    
    // Ensure modal is properly positioned and styled
    modal.style.position = 'fixed';
    modal.style.zIndex = '9999';
    modal.style.display = 'none';
    
    // Check if case study buttons exist
    const caseStudyButtons = document.querySelectorAll('.case-study-btn');
    console.log('Found case study buttons:', caseStudyButtons.length);
    caseStudyButtons.forEach((btn, index) => {
        console.log(`Button ${index + 1}:`, btn.getAttribute('data-project'), btn.textContent.trim());
        
        // Check button styles and properties
        const computedStyle = window.getComputedStyle(btn);
        console.log(`Button ${index + 1} styles:`, {
            opacity: computedStyle.opacity,
            pointerEvents: computedStyle.pointerEvents,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            zIndex: computedStyle.zIndex,
            position: computedStyle.position
        });
        
        // Clean up visual appearance (remove debugging borders)
        btn.style.border = '';
        btn.style.outline = '';
        
        // Light debug logging (keep minimal)
        btn.addEventListener('mouseenter', function() {
            console.log('Mouse entered button:', this.getAttribute('data-project'));
        });
    });

    // Get case studies data
    const caseStudies = getCaseStudies();
    console.log('Case studies loaded:', Object.keys(caseStudies));

    // Add simple click confirmation (remove alert for production)
    caseStudyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('🚨 CLICK DETECTED! Button clicked:', this.getAttribute('data-project'));
            // alert('Button clicked: ' + this.getAttribute('data-project')); // Commented out for production
        }, false);
    });
    
    // Add direct click handlers to each case study button as primary method
    caseStudyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Direct case study button clicked:', this);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            const projectId = this.getAttribute('data-project');
            console.log('Project ID:', projectId);
            
            const study = caseStudies[projectId];
            if (study) {
                console.log('Opening case study for:', projectId);
                titleEl.textContent = study.title;
                bodyEl.innerHTML = study.content;
                openModal();
            } else {
                console.error('Case study not found for:', projectId, 'Available:', Object.keys(caseStudies));
            }
        }, false);
    });
    
    // Use event delegation as fallback method
    document.addEventListener('click', function(e) {
        // Check if clicked element or its parent is a case study button
        const button = e.target.closest('.case-study-btn');
        if (button) {
            console.log('Event delegation case study button detected:', button);
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation(); // Prevent other event listeners
            
            const projectId = button.getAttribute('data-project');
            console.log('Case study button clicked via delegation:', projectId);
            
            const study = caseStudies[projectId];
            if (study) {
                console.log('Opening case study for:', projectId);
                titleEl.textContent = study.title;
                bodyEl.innerHTML = study.content;
                openModal();
            } else {
                console.error('Case study not found for:', projectId, 'Available:', Object.keys(caseStudies));
            }
            return false; // Ensure no further event propagation
        }
    }, true); // Use capture phase for higher priority

    // Close modal handlers
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function openModal() {
        try {
            console.log('Opening modal');
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            setTimeout(function() {
                modal.classList.add('show');
                console.log('Modal should be visible now');
            }, 10);
        } catch (error) {
            console.error('Error opening modal:', error);
        }
    }
    
    // Test modal functionality - add a global function to test
    window.testModal = function(projectId = 'nexusone') {
        console.log('Testing modal with project:', projectId);
        const study = caseStudies[projectId];
        if (study) {
            titleEl.textContent = study.title;
            bodyEl.innerHTML = study.content;
            openModal();
        } else {
            console.error('Test failed - case study not found for:', projectId);
        }
    };
    
    // Manual test modal - call testModal('projectId') in console to test
    console.log('💡 To test modal manually, type: testModal("nexusone") in console');

    function closeModal() {
        try {
            console.log('Closing modal');
            modal.classList.remove('show');
            setTimeout(function() {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }
}

/************************************
 * Contact Form                     *
 ************************************/
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:shreeansh2m2000@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        
        // Show success feedback
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '✓ Message Sent!';
        submitBtn.style.background = 'var(--accent-secondary)';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
    });
}

/************************************
 * Typing Animation                 *
 ************************************/
function initTextRotationAnimation() {
    const textElement = document.getElementById('typingText');
    
    if (!textElement) {
        console.log('Text rotation element not found');
        return;
    }
    
    console.log('Initializing text rotation animation');
    
    const phrases = [
        'Building Cloud-Native Solutions',
        'Architecting Scalable Systems',
        'Automating Infrastructure',
        'Developing Enterprise APIs',
        'Modernizing Legacy Systems',
        'Leading Integration Projects'
    ];
    
    let currentIndex = 0;
    let rotationInterval;
    
    function rotateText() {
        // Fade out current text
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Change text
            textElement.textContent = phrases[currentIndex];
            currentIndex = (currentIndex + 1) % phrases.length;
            
            // Fade in new text
            textElement.style.opacity = '1';
            textElement.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Set initial text
    textElement.textContent = phrases[0];
    textElement.style.opacity = '1';
    textElement.style.visibility = 'visible';
    textElement.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    
    // Start rotation after initial delay
    setTimeout(() => {
        currentIndex = 1; // Move to next phrase for first rotation
        rotationInterval = setInterval(rotateText, 3000); // Change every 3 seconds
    }, 3000);
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        if (rotationInterval) {
            clearInterval(rotationInterval);
        }
    });
}

/************************************
 * Enhanced Animations              *
 ************************************/
function initEnhancedAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Remove the animation-ready class and add appropriate animation
                element.classList.remove('animation-ready');
                
                // Add different animation classes based on element type
                if (element.classList.contains('skill-category')) {
                    element.classList.add('animate-slide-in-up');
                } else if (element.classList.contains('project-card')) {
                    element.classList.add('animate-fade-in');
                } else if (element.classList.contains('experience-item')) {
                    element.classList.add('animate-slide-in-left');
                } else if (element.classList.contains('cert-badge')) {
                    element.classList.add('animate-slide-in-up');
                } else if (element.classList.contains('education-item')) {
                    element.classList.add('animate-slide-in-right');
                } else if (element.classList.contains('contact-item')) {
                    element.classList.add('animate-fade-in');
                } else {
                    element.classList.add('animate-fade-in');
                }
                
                // Add staggered delay for multiple elements
                const siblings = Array.from(element.parentElement.children);
                const index = siblings.indexOf(element);
                element.style.animationDelay = `${index * 0.1}s`;
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation (excluding hero and navbar)
    const animatedElements = document.querySelectorAll(`
        .skill-category,
        .project-card,
        .experience-item,
        .cert-badge,
        .education-item,
        .contact-item,
        .about-content,
        .testimonial-card
    `);
    
    // Add animation-ready class only to non-critical elements
    animatedElements.forEach(el => {
        // Skip hero content and navigation elements
        if (!el.closest('.hero') && !el.closest('.navbar')) {
            el.classList.add('animation-ready');
            observer.observe(el);
        }
    });
    
    // Hero content should be visible immediately with animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate-fade-in');
        }, 100);
    }
    
    // Add hover effects to buttons (excluding case study buttons to avoid conflicts)
    const buttons = document.querySelectorAll('.btn:not(.case-study-btn)');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const profileImage = document.querySelector('.profile-image');
        const particles = document.querySelector('.particles');
        
        if (hero && scrolled < hero.offsetHeight) {
            if (profileImage) {
                const currentTransform = profileImage.style.transform || '';
                const baseTransform = currentTransform.includes('scale') ? currentTransform : '';
                profileImage.style.transform = `${baseTransform} translateY(${scrolled * 0.5}px)`;
            }
            if (particles) {
                particles.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        }
    });
    
    // Add click ripple effect to buttons (excluding case study buttons to avoid conflicts)
    const rippleButtons = document.querySelectorAll('.btn:not(.case-study-btn), .nav-link');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Skip if this is a case study button
            if (this.classList.contains('case-study-btn')) {
                return;
            }
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/************************************
 * Skills Animation                 *
 ************************************/
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(20px)';
                        entry.target.style.transition = 'all 0.6s ease';
                        
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.3 }
    );
    
    skillItems.forEach(item => observer.observe(item));
}

/************************************
 * Theme System Detection           *
 ************************************/
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('portfolio-theme')) {
            const theme = e.matches ? 'dark' : 'light';
            applyTheme(theme);
        }
    });
}

/************************************
 * Performance Optimizations       *
 ************************************/
// Preload critical resources
function preloadCriticalResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(fontUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = fontUrl;
        document.head.appendChild(link);
    });
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    preloadCriticalResources();
    initTextRotationAnimation();
    initSkillsAnimation();
});

// Add loaded class for CSS animations
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Export functions for external use if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initThemeToggle,
        initNavigation,
        initScrollEffects,
        initContactForm
    };
}