import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-background py-8 px-4 md:py-12">
      <div className="container max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2">
              <ArrowLeft className="size-4" />
              Back to Calculator
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-2">References</h1>
        <p className="text-muted-foreground mb-8">
          Data sources and resources used in the KV Enteral Calculator.
        </p>

        <div className="flex flex-col gap-6">
          {/* Regulatory & Coding Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Regulatory &amp; Coding Resources</CardTitle>
              <CardDescription>
                Official sources for HCPCS codes and product classifications
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ResourceLink
                title="CMS HCPCS Code Set"
                description="Official HCPCS Level II codes maintained by the Centers for Medicare & Medicaid Services"
                href="https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system"
              />
              <Separator />
              <ResourceLink
                title="PDAC (Pricing, Data Analysis and Coding)"
                description="CMS contractor for DMEPOS coding verification and product classification"
                href="https://www.dmepdac.com/"
              />
              <Separator />
              <ResourceLink
                title="eMedNY (New York Medicaid)"
                description="NY Medicaid HCPCS product classification lists"
                href="https://www.emedny.org/"
              />
              <Separator />
              <ResourceLink
                title="Texas HHS Enteral Nutrition Comparison Chart"
                description="Texas Health and Human Services enteral formula comparison resources"
                href="https://www.hhs.texas.gov/"
              />
            </CardContent>
          </Card>

          {/* Manufacturer Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Manufacturer Resources</CardTitle>
              <CardDescription>
                Product information from enteral formula manufacturers
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ResourceLink
                title="Abbott Nutrition"
                description="Manufacturer of Ensure, Jevity, Osmolite, Promote, PediaSure, Similac, and other formulas"
                href="https://abbottnutrition.com/"
              />
              <Separator />
              <ResourceLink
                title="Nestle Health Science"
                description="Manufacturer of Boost, Nutren, Compleat, Peptamen, Alfamino, and other formulas"
                href="https://www.nestlehealthscience.us/"
              />
              <Separator />
              <ResourceLink
                title="Kate Farms"
                description="Manufacturer of plant-based organic tube feeding formulas"
                href="https://www.katefarms.com/"
              />
              <Separator />
              <ResourceLink
                title="Functional Formularies"
                description="Manufacturer of Liquid Hope and Nourish blenderized formulas"
                href="https://www.functionalformularies.com/"
              />
              <Separator />
              <ResourceLink
                title="Real Food Blends"
                description="Manufacturer of real food blenderized tube feeding meals"
                href="https://www.realfoodblends.com/"
              />
              <Separator />
              <ResourceLink
                title="Mead Johnson / Reckitt"
                description="Manufacturer of Enfamil, Nutramigen, Pregestimil, and pediatric formulas"
                href="https://www.meadjohnson.com/"
              />
              <Separator />
              <ResourceLink
                title="Nutricia (Danone)"
                description="Manufacturer of Neocate, Nutrini, KetoCal, and specialty formulas"
                href="https://www.nutricia.com/"
              />
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Other helpful references for enteral nutrition
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <ResourceLink
                title="ASPEN (American Society for Parenteral and Enteral Nutrition)"
                description="Clinical guidelines and resources for nutrition support"
                href="https://www.nutritioncare.org/"
              />
              <Separator />
              <ResourceLink
                title="Academy of Nutrition and Dietetics"
                description="Professional organization for registered dietitians"
                href="https://www.eatright.org/"
              />
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 pb-6 text-center text-sm" style={{ color: "#FF69B4" }}>
          Made by Kristin Vandeloecht
        </footer>
      </div>
    </main>
  )
}

function ResourceLink({
  title,
  description,
  href,
}: {
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-lg p-2 -m-2 transition-colors hover:bg-muted/50"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
            {title}
          </span>
          <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </a>
  )
}
