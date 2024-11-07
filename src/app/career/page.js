"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PageLoader from "@/components/ui/pageloader";
import { Button } from "@/components/ui/button";

// Import components with `ssr: false` to avoid server-side issues
const CommonBanner = dynamic(() => import("@/components/global/CommonBanner"), {
  ssr: false,
});
const Accordion = dynamic(
  () => import("@/components/ui/accordionCareer").then((mod) => mod.Accordion),
  { ssr: false }
);
const AccordionItem = dynamic(
  () =>
    import("@/components/ui/accordionCareer").then((mod) => mod.AccordionItem),
  { ssr: false }
);
const AccordionTrigger = dynamic(
  () =>
    import("@/components/ui/accordionCareer").then(
      (mod) => mod.AccordionTrigger
    ),
  { ssr: false }
);
const AccordionContent = dynamic(
  () =>
    import("@/components/ui/accordionCareer").then(
      (mod) => mod.AccordionContent
    ),
  { ssr: false }
);
const Table = dynamic(
  () => import("@/components/ui/table").then((mod) => mod.Table),
  { ssr: false }
);
const TableBody = dynamic(
  () => import("@/components/ui/table").then((mod) => mod.TableBody),
  { ssr: false }
);
const TableRow = dynamic(
  () => import("@/components/ui/table").then((mod) => mod.TableRow),
  { ssr: false }
);
const TableCell = dynamic(
  () => import("@/components/ui/table").then((mod) => mod.TableCell),
  { ssr: false }
);

const Careerpage = ({ title }) => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetCareers = () => {
    setLoading(true);
    axios("https://starconcord.onrender.com/api/careerList", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    })
      .then((res) => {
        setCareers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetCareers();
  }, []);

  return (
    <div className="container w-full mx-auto lg:space-y-20 space-y-7">
      <CommonBanner
        image="/static/images/page title img.jpg"
        title="Careers"
        page="Careers"
      />
      {loading ? (
        <PageLoader />
      ) : (
        <div className="container px-3 pb-10 space-y-10 lg:px-10">
          <div className="space-y-4">
            <h2 className="font-semibold ">JOIN THE STAR CONCORD INDIA TEAM</h2>
            <p className="text-base md:text-lg">
              Look forward to accelerating your career with STAR CONCORD? Join
              our dynamic, goal-oriented team of professionals and give your
              career a boost! ...
            </p>
            <p className="text-base md:text-lg">
              We welcome you to be a part of the STAR CONCORD family & motivate
              you to embark on your voyage with us. Check out the Current
              Opportunities across various functions:
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {careers.map((career, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="p-3 space-y-4 text-black border border-gray-400"
              >
                <AccordionTrigger className="flex items-center justify-between text-3xl font-bold cursor-pointer">
                  <p className="text-sm font-semibold text-left uppercase md:text-base text-primary_color">
                    {career.title}
                  </p>
                  <p className="text-sm font-semibold text-right md:text-base text-primary_color">
                    {career.locations.join(" | ")}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 text-left transition duration-500">
                    <div className="space-y-3 text-left">
                      <p className="font-semibold uppercase">JOB DESCRIPTION</p>
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              Position:
                            </TableCell>
                            <TableCell className="text-left">
                              {career.position}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Reports to:
                            </TableCell>
                            <TableCell className="text-left">
                              {career.reports_to}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Experience:
                            </TableCell>
                            <TableCell className="text-left">
                              {career.experience}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">
                              Domain / Division:
                            </TableCell>
                            <TableCell className="text-left">
                              {career.domain}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <p className="font-semibold uppercase">REQUIREMENTS</p>
                      <div
                        className="space-y-4 hcontent tag"
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof window !== "undefined"
                              ? career.requirements
                              : "",
                        }}
                      />
                      <Link
                        href={`/career-apply-now/${career._id}`}
                        key={career._id}
                      >
                        <Button
                          variant="primary"
                          className="flex items-center gap-2 mt-4"
                        >
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      )}
    </div>
  );
};

export default Careerpage;
