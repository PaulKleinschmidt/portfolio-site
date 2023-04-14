import Head from 'next/head';
import client from '@/client';
import { Experience, Project } from '@/types/sanity-schema';
import { InferGetStaticPropsType } from 'next';
import { Briefcase, Codesandbox, GitHub, Linkedin, Mail } from 'react-feather';
import { IconLink } from '@/components/IconLink';
import { ExperienceContainer } from '@/components/ExperienceContainer';
import { ProjectContainer } from '@/components/ProjectContainer';

export default function Home({
  experience,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Paul K | Software Engineer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="max-w-2xl m-auto mt-20 px-4 md:px-auto">
        <div className="md:flex text-center md:text-left">
          <div className="rounded-full relative overflow-hidden w-32 h-32 border-indigo-500 border-2 mx-auto mb-4 md:mb-0">
            <img
              src="/paul-photo.jpg"
              alt="Photo of Paul"
              className="h-auto w-auto inline pb-5"
            />
          </div>
          <div className="mx-8">
            <h1 className="text-4xl font-bold">Paul Kleinschmidt</h1>
            <h2 className="mt-1 text-2xl">Software Engineer</h2>
            <div className="mt-8 flex justify-center md:justify-start">
              <IconLink
                IconComponent={Codesandbox}
                url="https://codesandbox.io/u/PaulKleinschmidt"
              />
              <IconLink
                IconComponent={GitHub}
                url="https://github.com/PaulKleinschmidt"
              />
              <IconLink
                IconComponent={Linkedin}
                url="https://www.linkedin.com/in/paul-k/"
              />
              <IconLink
                IconComponent={Mail}
                url="mailto:paul.kleinschmidt96@gmail.com"
              />
              <IconLink
                IconComponent={Briefcase}
                url=" https://docs.google.com/document/d/17jYjM9NyFrac9NXrWjwww_Q3Df1tSBtiP0Au2uLWd9s"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-lg ">
          👋 Hello!
          <div>
            <br />
            I&apos;m a software engineer specializing in full stack web
            development with a passion for creating unique and engaging user
            experiences. Lately I've been working with technologies like React,
            TypeScript, Next.js, Svelte, and Clojure.
          </div>
        </div>

        <h1 className="my-8 text-4xl font-bold border-t-4 border-indigo-600 pt-8">
          Experience
        </h1>

        {experience.map((job) => {
          return <ExperienceContainer key={job._id} experience={job} />;
        })}

        <h1 className="my-8 text-4xl font-bold pt-8">Projects</h1>

        {projects.map((project, i) => {
          return (
            <ProjectContainer index={i} key={project._id} project={project} />
          );
        })}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const experience: Experience[] = await client.fetch(`
    *[_type == "experience"]
  `);

  const projects: Project[] = await client.fetch(`
    *[_type == "project"]
  `);

  return {
    props: {
      experience,
      projects,
    },
  };
}
