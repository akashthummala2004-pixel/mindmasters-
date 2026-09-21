import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate, ServicePageConfig } from "@/components/site/ServicePageTemplate";
import { SITE_URL, COMPANY_NAME } from "@/lib/seo-schemas";

const config: ServicePageConfig = {
  slug: "ai-ml-solutions",
  serviceTitle: "AI/ML Development Services",
  h1Title: "AI & Machine Learning Solutions for Enterprise Innovation",
  metaDesc:
    "Custom machine learning models, predictive analytics, generative AI solutions, and deep learning systems built for enterprise performance and scale.",
  heroTag: "Custom Machine Learning & Generative AI",
  overviewDesc:
    "We build end-to-end artificial intelligence and machine learning solutions — from bespoke model training and fine-tuning to predictive analytics pipelines, computer vision systems, and generative AI infrastructure.",
  problemsTitle: "Data & ML Complexity We Resolve For Enterprise Teams",
  problems: [
    {
      title: "Untapped Enterprise Data",
      desc: "Vast volumes of unstructured documents, sensor telemetry, and logs going unanalyzed without predictive model intelligence.",
    },
    {
      title: "Model Accuracy & Latency Gaps",
      desc: "Off-the-shelf AI APIs failing to satisfy specific industry accuracy requirements or strict latency SLAs.",
    },
    {
      title: "Deployment & MLOps Overhead",
      desc: "Difficulties transitioning experimental machine learning models from Jupyter notebooks to resilient production microservices.",
    },
  ],
  features: [
    {
      title: "Custom LLM Fine-Tuning & RAG",
      desc: "Fine-tuning open-source LLMs (Llama 3, Mistral) and engineering retrieval-augmented generation pipelines on enterprise data.",
    },
    {
      title: "Predictive Analytics & Forecasting",
      desc: "Time-series forecasting, demand modeling, customer churn prediction, and risk scoring algorithms.",
    },
    {
      title: "Computer Vision & Visual AI",
      desc: "Object detection, visual defect inspection, image segmentation, and document optical character recognition (OCR).",
    },
    {
      title: "Production MLOps Pipelines",
      desc: "Automated model retraining, continuous evaluation, drift monitoring, and low-latency inference serving engines.",
    },
  ],
  technologies: [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Hugging Face",
    "OpenCV",
    "CUDA",
    "Ray Serve",
    "MLflow",
    "FastAPI",
    "Docker",
    "Kubernetes",
  ],
  useCases: [
    {
      title: "Financial Risk & Fraud Detection",
      desc: "Real-time transaction scoring analyzing millions of event streams daily with sub-20ms inference latency.",
    },
    {
      title: "Healthcare Diagnostic Copilot",
      desc: "Deep learning vision algorithms aiding radiologists in detecting anomalies across high-resolution medical imaging.",
    },
    {
      title: "Predictive Maintenance in Industry",
      desc: "IoT sensor anomaly detection algorithms forecasting equipment failure weeks before costly breakdowns occur.",
    },
  ],
  process: [
    {
      step: "01",
      title: "Data Audit & Feasibility",
      desc: "We analyze your dataset quality, clean and structure raw data, and establish baseline performance metrics.",
    },
    {
      step: "02",
      title: "Model Architecture & Training",
      desc: "Selecting optimal model architectures, running experiments, fine-tuning weights, and hyperparameter tuning.",
    },
    {
      step: "03",
      title: "Evaluation & Optimization",
      desc: "Benchmarking precision, recall, latency, and quantizing models for efficient edge or cloud deployment.",
    },
    {
      step: "04",
      title: "MLOps & Cloud Deployment",
      desc: "Building continuous integration, automated monitoring pipelines, and scalable API endpoints.",
    },
  ],
  faqs: [
    {
      question: "Do you build models from scratch or fine-tune existing foundation models?",
      answer:
        "We choose the most cost-effective and high-performing strategy: fine-tuning frontier foundation models (GPT-4o, Claude 3.5, Llama 3) for domain tasks, or building custom ML architectures when specialized tabular or vision models are required.",
    },
    {
      question: "How do you handle data security and compliance?",
      answer:
        "All model training and inference pipelines can be deployed inside your private VPC (AWS, GCP, Azure) or on-premise infrastructure to comply with HIPAA, GDPR, SOC 2, and ISO standards.",
    },
    {
      question: "What is the typical timeframe for an enterprise AI/ML project?",
      answer:
        "A Proof of Concept (PoC) model is typically validated within 2 to 3 weeks, followed by full production engineering and MLOps deployment within 6 to 8 weeks.",
    },
  ],
  offers: [
    "Custom Machine Learning Model Development",
    "Generative AI & Fine-Tuning Services",
    "Predictive Analytics & Data Science",
    "Enterprise MLOps & Inference Optimization",
  ],
  relatedServices: [
    {
      name: "AI Agents & Automation Services",
      slug: "/ai-agents-automation",
      desc: "Autonomous AI agents, voice assistants, and enterprise workflow automation.",
    },
    {
      name: "SaaS Development Company",
      slug: "/saas-development",
      desc: "Multi-tenant cloud platforms, subscription billing, and scalable SaaS infrastructure.",
    },
    {
      name: "Web Application Development",
      slug: "/web-application-development",
      desc: "Custom web applications, dashboards, and enterprise portals.",
    },
  ],
};

export const Route = createFileRoute("/ai-ml-solutions")({
  head: () => ({
    meta: [
      { title: `${config.serviceTitle} | ${COMPANY_NAME}` },
      { name: "description", content: config.metaDesc },
      {
        name: "keywords",
        content:
          "AI/ML development services, generative AI solutions, machine learning models, predictive analytics, deep learning infrastructure, custom AI development",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: `${config.serviceTitle} | ${COMPANY_NAME}` },
      { property: "og:description", content: config.metaDesc },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/ai-ml-solutions` },
      { property: "og:image", content: `${SITE_URL}/companylogo.png` },
      { property: "og:site_name", content: COMPANY_NAME },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${config.serviceTitle} | ${COMPANY_NAME}` },
      { name: "twitter:description", content: config.metaDesc },
      { name: "twitter:image", content: `${SITE_URL}/companylogo.png` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/ai-ml-solutions` }],
  }),
  component: () => <ServicePageTemplate config={config} />,
});
