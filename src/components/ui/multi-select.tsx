"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "~/components/ui/command";
import { ScrollArea } from "~/components/ui/scroll-area";

type MultiSelectProps = {
    label: string;
    options: Record<string, string[]>;
    value: string[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    maxHeight?: number; // px
};

export function MultiSelect({
    label,
    options,
    value,
    onChange,
    placeholder = "Select...",
    maxHeight = 260,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    const toggle = (trait: string) => {
        const set = new Set(value);
        if (set.has(trait)) {
            set.delete(trait)
        } else {
            set.add(trait);
        }
        onChange(Array.from(set));
    };

    const remove = (trait: string) => onChange(value.filter((t) => t !== trait));
    const clearAll = () => onChange([]);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
                {value.length === 0 ? (
                    <span className="text-muted-foreground">{placeholder}</span>
                ) : (
                    value.map((t) => (
                        <Badge key={t} variant="secondary" className="gap-1 capitalize">
                            {t}
                            <button
                                type="button"
                                aria-label={`Remove ${t}`}
                                onClick={() => remove(t)}
                                className="ml-1 -mr-1 rounded hover:bg-muted p-0.5"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </Badge>
                    ))
                )}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                        Add {label}
                        <Plus className="ml-2 h-4 w-4 opacity-70" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 container" side="bottom">
                    <Command shouldFilter={false}>
                        <CommandInput autoFocus placeholder={`Search ${label}...`} />
                        <ScrollArea style={{ maxHeight }}>
                            <CommandList>
                                <CommandEmpty>No {label} found.</CommandEmpty>

                                {Object.entries(options).map(([group, traits], gi) => (
                                    <React.Fragment key={group}>
                                        <CommandGroup heading={group}>
                                            {traits.map((trait) => {
                                                const selected = value.includes(trait);
                                                return (
                                                    <CommandItem
                                                        key={trait}
                                                        onSelect={() => toggle(trait)}
                                                        className="justify-between"
                                                    >
                                                        <span className="capitalize">{trait}</span>
                                                        <span
                                                            aria-hidden
                                                            className={`ml-2 h-2.5 w-2.5 rounded-full border ${selected ? "bg-primary" : "bg-transparent"
                                                                }`}
                                                        />
                                                    </CommandItem>
                                                );
                                            })}
                                        </CommandGroup>
                                        {gi < Object.keys(options).length - 1 && (
                                            <CommandSeparator />
                                        )}
                                    </React.Fragment>
                                ))}
                            </CommandList>
                        </ScrollArea>
                        <div className="flex items-center justify-between px-2 py-2 border-t z-10 bg-background">
                            <Button variant="outline" size="sm" onClick={clearAll}>
                                Clear all
                            </Button>
                            <Button size="sm" onClick={() => setOpen(false)}>
                                Done
                            </Button>
                        </div>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
