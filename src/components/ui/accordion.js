'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { FaCirclePlus } from 'react-icons/fa6';
import { IoCloseCircle } from "react-icons/io5";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";



const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    // State to track accordion open/close
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex flex-1 items-center justify-between py-6 font-medium transition-all',
            className
          )}
          {...props}
          onClick={() => setIsOpen(!isOpen)}
        >
          {children}
          {/* Conditional rendering based on accordion state */}
          {isOpen ? (
            <AiFillCloseCircle className="text-3xl text-primary_color" />
          ) : (
            <AiFillPlusCircle className="text-3xl text-primary_color" />
          )}
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  }
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
