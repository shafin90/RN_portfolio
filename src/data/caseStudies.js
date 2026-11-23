const caseStudies = [
  {
    slug: "jetexpress",
    company: "JetExpress",
    role: "Product Engineer · Contract",
    period: "Jun 2026 — Present",
    status: "Live",
    title: "One transport network, two operating businesses",
    detailTitle: "JetExpress — From trip inventory to reliable operations",
    excerpt: "Passenger ticketing and parcel delivery share routes, vehicles, stations, and operators. The product challenge is to keep each promise coherent across the public site, two mobile apps, the operator dashboard, and a tenant-aware backend.",
    meta: [
      { label: "Product", value: "Multi-tenant transport platform" },
      { label: "Users", value: "Passengers · operators · field staff" },
      { label: "Commercial model", value: "Operator plans + platform commissions" },
      { label: "Status", value: "Live · active development" },
    ],
    productLinks: [
      { label: "Passenger app · Google Play", url: "https://play.google.com/store/apps/details?id=com.jetexpress.passenger" },
      { label: "Staff app · Google Play", url: "https://play.google.com/store/apps/details?id=com.bandamatech.staffapp" },
      { label: "Operator backOffice", url: "https://app.jetexpresstransport.com/" },
      { label: "Public website", url: "https://jetexpresstransport.com/" },
    ],
    atAGlance: [
      { number: "01", title: "Model the passenger and parcel businesses separately." },
      { number: "02", title: "Keep seat, payment, and ticket truth on the server." },
      { number: "03", title: "Treat tenant boundaries as product behavior." },
      { number: "04", title: "Carry each handoff through the surface built for that job." },
    ],
    scopeNote: "The repository includes passenger ticketing and operator-led shipment workflows. The public website, JetBusExpress, backOffice, and stuff_app are different surfaces on the same platform; parcel creation and tracking are currently operator workflows.",
    sections: [
      {
        number: "01", title: "Product overview", navTitle: "Overview",
        summary: "A B2B2C transport platform where an operator can sell passenger seats and move parcels using one fleet and control plane.",
        paragraphs: [
          "Passengers use the public website or JetBusExpress app to find a route, choose a trip and seat, pay, and retrieve a ticket. Operators use backOffice to configure routes, stations, vehicles, schedules, bookings, and shipment handoffs. Drivers and trip staff use stuff_app to see assigned work and verify boarding.",
          "The product serves intercity operators in West Africa, including XOF pricing and English/French localization. The platform supports company plans, commissions, feature settings, timezone, and currency; the repository points to a B2B2C SaaS model, with commercial terms configured per tenant.",
          "My role was Product Engineer on the contract team. I worked across the client and backend boundaries, focusing on the journeys where availability, payment, ticket validity, and operator execution must agree."
        ],
        cards: [
          { label: "Passenger", title: "Public site + JetBusExpress", body: "Route discovery, seat selection, checkout, ticket retrieval, booking management, and support." },
          { label: "Operations", title: "backOffice", body: "Routes, stations, fleet, schedules, passenger bookings, parcels, maintenance, reporting, and tenant operations." },
          { label: "Field execution", title: "stuff_app", body: "Assigned trips, passenger manifests, QR scanning, and manual verification at boarding." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "02", title: "The problem", navTitle: "The problem",
        summary: "A booking is a chain of promises: an available seat must stay available through payment and remain verifiable at boarding. A parcel has a different custody chain on the same transport network.",
        paragraphs: [
          "The system serves people with different jobs and different failure conditions. A passenger needs a trustworthy fare and ticket. An operator needs to configure capacity and resolve exceptions. A driver needs a current roster. A station team needs to know who has custody of a parcel and what action is next.",
          "If each surface owns its own version of availability, payment, or status, the business can sell a promise that operations cannot fulfill. Treating shipments as generic bookings would also lose sender, recipient, payer, last-mile, and custody details that staff need to complete delivery."
        ],
        cards: [
          { label: "Passenger risk", title: "Seat or payment ambiguity", body: "Retries, delayed provider callbacks, or stale client state can make it unclear whether a seat is still available or a payment actually settled." },
          { label: "Operator risk", title: "Scattered operational truth", body: "Trips, staff, bookings, and parcels need coordinated records across the company’s operating workflow." },
          { label: "Domain risk", title: "One network, different promises", body: "Passenger inventory and parcel custody use the same vehicles but have different states, rules, and proof of completion." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "03", title: "Product decisions", navTitle: "Decisions",
        summary: "Keep each business rule close to the domain that owns the promise, and let client surfaces present that rule instead of reimplementing it.",
        decisions: [
          { number: "01", title: "Keep Booking and Shipment distinct", problem: "A generic order would blur seat, passenger, and boarding state with parcel custody, recipient, and delivery state.", decision: "Maintain separate booking and shipment workflows while linking both to shared routes, stations, trips, and vehicles.", tradeoff: "More explicit domain models and dashboard steps; less ambiguity for operators and safer evolution of each business.", impact: "Passenger ticketing can evolve without making parcel exceptions look like booking states." },
          { number: "02", title: "The backend owns payment and inventory truth", problem: "A redirect or cached screen cannot prove that a provider settled the right amount or that a seat remains available.", decision: "Calculate fare server-side, verify provider state, guard payment transitions, and issue the signed ticket only after confirmation.", tradeoff: "Checkout depends on a live server round trip and has to explain pending or conflicting states.", impact: "The ticket and boarding check are anchored to confirmed booking state rather than a client-side success screen." },
          { number: "03", title: "Make company identity explicit", problem: "A shared platform holds records for multiple transport operators with different staff and commercial settings.", decision: "Carry authenticated company context and role checks through routes and company-scoped repositories.", tradeoff: "Every cross-surface operation must preserve tenant context.", impact: "The same deployment can serve multiple operators without turning tenant isolation into a UI convention." },
        ], layout: ["decisions"]
      },
      {
        number: "04", title: "System design", navTitle: "Architecture",
        summary: "Four client surfaces call one Express platform API; domain services connect to MongoDB, Redis, RabbitMQ, payment providers, ticket generation, and notifications.",
        paragraphs: ["The system map above shows the connected surfaces and infrastructure. The important boundary is that interfaces own user-specific presentation, while the backend owns tenant checks, trip and shipment rules, financial state, and durable records."],
        cards: [
          { label: "API + domains", title: "Express 5 · tenant-aware modules", body: "Auth, company and role policy, trips, bookings, fleet, stations, shipments, tickets, support, notifications, and reporting." },
          { label: "State + async work", title: "MongoDB · Redis · RabbitMQ", body: "MongoDB stores operational records; Redis supports short-lived and live state; RabbitMQ consumers handle booking, ticket, and notification work." },
          { label: "External edges", title: "CinetPay · PayDunya · Firebase · Resend", body: "Payment status, push delivery, email, and uploaded files cross explicit provider boundaries." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "05", title: "Key product flows", navTitle: "Journeys",
        summary: "The experience is complete only when the next operator or traveler can act on the result.",
        flows: [
          { id: "A", title: "Passenger booking → boarding", summary: "A ticket becomes a credential staff can verify.", steps: ["Website or app searches shared trip inventory", "Passenger selects a seat and submits details", "API validates company, trip, and booking rules", "Provider settles the server-calculated payment", "Ticket pipeline issues a signed QR", "stuff_app checks it against live booking state"], body: "The client can display a pending state while payment is unresolved. A return URL alone does not confirm the booking; the backend reconciles provider status before issuing a valid ticket.", callout: "If the selected seat conflicts at submit, clear the stale selection and let the passenger choose again." },
          { id: "B", title: "Parcel received → delivered or exceptioned", summary: "A dashboard workflow tracks the chain of custody across the network.", steps: ["Staff capture sender, recipient, item, payer, and destination", "Operator calculates transport and optional last-mile charges", "Shipment is assigned to a trip or vehicle", "Station staff record arrival and pickup / delivery handoff", "Exception or return states keep unresolved work visible"], body: "The shipment stays its own domain record while sharing the operator’s trips, stations, staff, and vehicles. In the reviewed scope, parcel creation and tracking live in backOffice rather than the passenger app.", callout: "Each state should identify the next owner and the evidence needed to close the handoff." },
          { id: "C", title: "Support conversation → staff response", summary: "Customer help enters the same company-scoped operational queue.", steps: ["Customer opens a support conversation", "API associates it with the customer and tenant", "Operator staff review and respond in backOffice", "Realtime events update the staff experience"], body: "The public site uses REST for support entry; staff chat and notifications use the platform’s realtime channel." },
        ], layout: ["flows"]
      },
      {
        number: "06", title: "Engineering challenges & trade-offs", navTitle: "Challenges",
        summary: "The hard work is preserving trustworthy state across retries, provider delays, tenant boundaries, and physical handoffs.",
        challenges: [
          { number: "01", title: "Payment redirect is not settlement", problem: "A passenger can close checkout or return before the provider has finalized payment.", options: [{ label: "Trust the redirect", verdict: "Rejected", reason: "It reports browser navigation, not a verified payment amount or final provider state." }, { label: "Reconcile provider state", verdict: "Chosen", reason: "The API verifies reference, amount, and provider state before moving the booking forward." }], decision: "Treat provider verification and guarded state transitions as the financial commit point; expire stale invoices only after rechecking status.", tradeoff: "A passenger may wait longer in a pending state while the system protects the seat from premature release.", impact: "Ticket creation follows the confirmed payment path, so the boarding credential reflects the booking record." },
          { number: "02", title: "One fleet, different inventory semantics", problem: "Passenger seats and parcels share capacity resources but are not the same thing to buy or hand over.", decision: "Keep Booking and Shipment separate and link them to common trip, station, and vehicle records.", tradeoff: "Operators navigate different workflows for tickets and parcels instead of one generic order form.", impact: "Each workflow can express its real states without weakening the other’s invariants." },
          { number: "03", title: "Custody needs evidence", problem: "A current shipment status alone does not explain who changed it or what happened at a station.", decision: "Model actionable shipment states and identify durable, company-scoped custody events as the next reliability improvement.", tradeoff: "An append-only event history adds storage and migration work.", impact: "A future audit trail can help teams resolve delayed or disputed handoffs with evidence." },
        ], layout: ["challenges"]
      },
      {
        number: "07", title: "Results & business impact", navTitle: "Results",
        summary: "The live product connects passenger sales and operator-led parcel delivery to the same transport network and company-scoped operating records.",
        paragraphs: ["The delivered system provides a public booking path, passenger and staff apps, an operator control plane, payment reconciliation, ticket issuance, and shipment workflows. These are concrete product capabilities visible in the repositories. I have not verified customer counts, revenue, conversion, or time saved, so I do not claim those metrics."],
        cards: [
          { label: "Customer", title: "Book and carry a verifiable ticket", body: "Search, seat selection, checkout, ticket retrieval, and boarding verification connect to shared trip state." },
          { label: "Operator", title: "Run passenger and parcel operations", body: "Schedule services, manage fleet and bookings, and move shipments through operator handoffs." },
          { label: "Platform", title: "Configure multiple transport companies", body: "Plans, roles, tenant settings, and company-scoped records support a shared platform model." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "08", title: "What I would improve next", navTitle: "Next",
        summary: "Measure where the system’s promises slow down or become uncertain, then close the highest-risk operational gaps.",
        paragraphs: ["I would first make shipment assignment checks derive from trusted server-side route, item, and vehicle data, then add an append-only custody event trail with actor, timestamp, company, and evidence. For passenger operations, I would instrument payment-to-ticket latency and seat-conflict recovery. For delivery, I would measure dwell time by station and unresolved exceptions."],
        callout: { label: "Success measures", text: "Seat conflicts recovered · payment-to-ticket time · parcel dwell by station · age of unresolved exceptions." },
        layout: ["paragraphs", "callout"]
      },
    ],
  },
  {
    slug: "poolrev",
    company: "PoolRev",
    role: "Bug Fixer · Mid-Level Full Stack Developer",
    period: "Jun 2026 — Jul 2026",
    status: "Live",
    title: "One operating system for pool service, from estimate to collected work",
    detailTitle: "PoolRev — Keep field work, billing, and tenant state in agreement",
    excerpt: "Pool service is a recurring operation: a customer may own several properties, technicians complete work in the field, and billing follows the service actually delivered. PoolRev connects those responsibilities. My contribution focused on repairing high-risk seams in billing, tenant access, and field operations inside an already-live product.",
    meta: [
      { label: "Product", value: "Multi-tenant pool-service operations SaaS" },
      { label: "Users", value: "Owners · office teams · technicians · customers" },
      { label: "Business model", value: "Operator subscriptions + customer payments" },
      { label: "My scope", value: "Billing integrity · tenant boundaries · field workflows" },
    ],
    atAGlance: [
      { number: "01", title: "Treat each property as the operational and billing unit." },
      { number: "02", title: "Carry a service visit through evidence, invoice, and settlement." },
      { number: "03", title: "Make payment recovery consistent across every collection path." },
      { number: "04", title: "Enforce tenant and technician access at trusted boundaries." },
    ],
    scopeNote: "PoolRev was already a live, broad operations platform when I joined. This case study describes the full product system, then focuses my contribution on specific billing, authorization, and field-operation fixes; it does not claim I designed or built the entire platform.",
    sections: [
      {
        number: "01", title: "Product overview", navTitle: "Overview",
        summary: "A pool-service business runs on recurring visits, but the system must account for the right property, technician, service evidence, invoice, and payment each time.",
        paragraphs: [
          "PoolRev gives a pool-service operator one workspace for customer and property records, estimates, recurring service plans, technician routes, work orders, billing, reporting, and customer communication. Office teams manage the business from a web app; technicians use a Capacitor mobile app in the field; customers interact through quote, invoice, and service-report pages.",
          "The product’s core promise is operational continuity. A quote can become scheduled work; a technician records what happened; that service can create a property-scoped invoice; and payment, refund, pause, or retry state remains visible to the operator. GoHighLevel supports CRM and pipeline workflows, Stripe handles customer payments and PoolRev subscriptions on separate paths, and phone, email, storage, and optional AI features connect at explicit integration boundaries.",
          "I joined for a short contract as a mid-level full-stack bug fixer on the live platform. I traced failures across UI, database rules, Edge Functions, background billing, and the field app, then repaired the specific seam rather than treating each visible symptom as an isolated screen bug."
        ],
        cards: [
          { label: "Business owner", title: "Desktop operations", body: "Review customer and property health, estimates, routes, daily action queues, invoices, collections, reports, and account settings." },
          { label: "Field technician", title: "Mobile service execution", body: "See assigned stops, access permitted customer details, record readings and photos, complete work, and sync queued changes when connectivity returns." },
          { label: "Customer", title: "Public service touchpoints", body: "Review and accept a quote, view or pay an invoice, and receive service information without needing the operator’s internal workspace." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "02", title: "The problem", navTitle: "The problem",
        summary: "In a live operations product, a workflow is only correct when all of its surfaces agree on what happened.",
        paragraphs: [
          "A customer can represent a household or property manager with several pools. Each property can have its own service schedule, rate, credits, invoice history, and pause state. If the system stores billing decisions only at customer level, pausing one pool can accidentally interrupt another, or a secondary address can inherit a rate that was never agreed for it.",
          "Service completion and billing also run on different clocks. A technician may finish while offline; a scheduled job may catch up later; a payment provider may call back after the customer has left checkout. If UI status, invoice state, payment events, and background work each resolve those events differently, operators see stale failures, duplicate work, or a refund that appears to have vanished.",
          "Finally, the app is multi-tenant and role-based. A technician needs enough property information to do assigned work, while tenant boundaries must prevent one company’s staff or customer data from appearing in another company’s workspace. Those rules need to hold in the database and server-side actions, not only in the screens."
        ],
        cards: [
          { label: "Revenue risk", title: "Service and money drift apart", body: "A payment can succeed while a failed/overdue badge remains, or an automated invoice can be created twice when concurrent screens race." },
          { label: "Customer risk", title: "One customer, multiple billing realities", body: "A property manager needs independent service and billing decisions per address, with an aggregate view that does not erase property-level truth." },
          { label: "Trust boundary", title: "A role check is not a tenant check", body: "An admin role alone does not prove the requested technician, customer, property, or operation belongs to that caller’s tenant." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "03", title: "Product decisions", navTitle: "Decisions",
        summary: "I fixed the shared state transition or ownership rule behind the symptom, so the same invariant held across screens and automation.",
        decisions: [
          { number: "01", title: "Make property the billing unit", problem: "One customer record can represent several pools, but a rate, pause, credit, or invoice may belong to only one property.", decision: "Carry property scope through recurring billing actions and preserve separate property billing state while the customer view aggregates balances for the operator.", tradeoff: "More explicit scope in forms, queries, and mutations; simpler-to-explain invoices and safer independent service decisions for each address.", impact: "An operator can pause or change the billing context for one property without silently changing the others." },
          { number: "02", title: "Resolve payment recovery through one shared rule", problem: "Stripe, manual payment, retry, and applied credit paths could settle money while leaving a customer marked failed or overdue.", decision: "Use a shared failed-state resolver: clear failure state only after the relevant settlement condition is met and no open invoice remains; do not implicitly reactivate paused, suspended, or cancelled accounts.", tradeoff: "Every settlement path must call the same domain rule, and partial payment remains distinct from full resolution.", impact: "The financial record, customer status, and collections queues can reflect the same outcome after a payment or retry." },
          { number: "03", title: "Let the database arbitrate concurrent auto-creation", problem: "Filter-cleaning and batch-invoice screens could both pass a check-then-insert test and create duplicate work orders or draft invoices.", decision: "Assign deterministic deduplication keys, enforce them with unique database indexes, and use idempotent inserts that reread the winning record after a conflict.", tradeoff: "Automation needs a stable identity for the work it creates, and callers must handle the already-created path.", impact: "Concurrent page loads converge on one persisted work order or invoice instead of relying on timing luck." },
          { number: "04", title: "Bind authorization to the data being changed", problem: "A global admin role did not establish that a technician ID in a request belonged to the caller’s company; broad operations-table access could expose or change sensitive state.", decision: "Compare caller and target tenant context in privileged Edge Functions and narrow row-level policies by role and tenant for operational tables.", tradeoff: "More explicit authorization checks and policy tests at each trusted boundary.", impact: "Cross-tenant technician changes are rejected, and technicians cannot read or mutate admin-only operational records." },
        ], layout: ["decisions"]
      },
      {
        number: "04", title: "System design", navTitle: "Architecture",
        summary: "Web, mobile, and public experiences share a Supabase-backed product core, with Edge Functions and scheduled workers owning privileged actions and external side effects.",
        paragraphs: [
          "The operator interface is a React, Vite, and TypeScript app. The field app uses the same product data from a Capacitor mobile surface and has local caching and an offline write queue for field work. Customer quote, invoice, and service-report pages expose carefully scoped public journeys rather than the operator console.",
          "Supabase provides authentication, PostgreSQL, row-level security, storage, Realtime, and Edge Functions. Direct data access is governed by tenant and role policies; privileged billing, payment webhooks, CRM/phone actions, and other server-side work pass through Edge Functions. Cron and retry workers handle invoice generation, reminders, payment recovery, and dunning so a browser session is not responsible for completing the business process.",
          "Two Stripe roles must remain distinct: Stripe Connect processes an operator’s charges to their customers; a separate Stripe platform path bills the operator for PoolRev SaaS access. QuickBooks is an alternative tenant billing path for customer imports and invoice push, with payment tracked through QuickBooks rather than a direct PoolRev card charge. GoHighLevel provides selected CRM and pipeline synchronization, while Telnyx and configured email/SMS providers connect at separate operational edges. Optional AI and prospecting modules extend the system without becoming part of the critical service-to-payment path."
        ],
        cards: [
          { label: "Clients", title: "Three different jobs", body: "Desktop operators manage the business; mobile technicians execute assigned work; public pages let customers review quotes, invoices, and service information." },
          { label: "Data and trust", title: "Supabase + PostgreSQL + RLS", body: "Canonical customer, property, route, work, invoice, and payment state is persisted with tenant-aware database access; sensitive operations use server-side checks." },
          { label: "Automation", title: "Edge Functions + cron/retry workers", body: "Webhooks and background tasks reconcile invoice, payment, reminder, CRM, and communication events after the original user interaction ends." },
          { label: "External systems", title: "Payment rails, accounting, and channels", body: "Stripe Connect for customer card charges; platform Stripe for PoolRev subscriptions; QuickBooks for tenant imports and invoice push; GHL for CRM; Telnyx and configured providers for communications." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "05", title: "Key product flows", navTitle: "Journeys",
        summary: "The system connects acquisition, field execution, and money movement without treating them as separate products.",
        flows: [
          { id: "A", title: "Estimate → service → invoice → settlement", summary: "A customer commitment becomes work the operator can complete and reconcile.", steps: ["Operator creates an estimate for a customer and property", "Customer reviews the scoped public quote and accepts", "Office schedules a route stop or work order", "Technician records service, readings, and supporting photos", "Completion creates the appropriate service/billing event", "Property billing rules determine draft/send/charge behavior", "The configured processor updates invoice state: Stripe Connect for card collection, or QuickBooks for invoice push and external collection"], body: "The customer and property are related but not interchangeable. Work completion supplies the operational event; tenant defaults and property-level overrides determine the billing behavior; the payment integration reports settlement separately from the initial checkout interaction.", callout: "A return from checkout is not settlement. Keep invoice and customer status pending until the verified payment path resolves." },
          { id: "B", title: "Multiple pools → independent billing decisions", summary: "A customer-level summary can aggregate without collapsing property-level ownership.", steps: ["Customer profile links one or more service properties", "Each property keeps its service and billing configuration", "Operator pauses or updates only the intended property", "Invoices, credits, and payment history remain property-scoped", "Customer summary aggregates what the operator needs to review"], body: "This is why the property selector in billing actions matters: the product relationship can remain one customer while schedules, charges, and pauses differ by pool. The trade-off is deliberate data and UI scope in exchange for correct operational decisions.", callout: "Never apply one property’s rate or collected credit to a different property just because both share a customer record." },
          { id: "C", title: "Repeated trigger → one durable record", summary: "List loads and cron retries must not multiply business work.", steps: ["A screen or scheduled process detects a missing work order or draft invoice", "It derives a deterministic key from the business period and target record", "The database unique constraint arbitrates concurrent inserts", "An idempotent writer ignores the duplicate conflict", "The losing caller rereads and continues with the persisted record"], body: "The race was structural: two callers could both observe ‘missing’ before either wrote. The fix moves the final decision to the database, where concurrency is serialized by the unique key rather than by client timing.", callout: "Retry safely by stable business identity; do not create a new key each time the same job is retried." },
          { id: "D", title: "Technician sign-in → scoped field work", summary: "A mobile role sees only the work and customer information needed for its tenant and assignment.", steps: ["User signs in and resolves their tenant and role", "Mobile route data is filtered to authorized assigned work", "Sensitive customer/property fields follow capability and route scope", "Offline mutations queue against the same authorized work context", "Server and RLS checks validate the mutation when it syncs"], body: "The mobile interface is not the security boundary. Caller/target tenant checks and least-privilege policies keep unauthorized IDs from turning into cross-company access.", callout: "On sign-out, clear local and in-memory tenant data so a later session cannot momentarily display the previous workspace." },
        ], layout: ["flows"]
      },
      {
        number: "06", title: "Engineering challenges & trade-offs", navTitle: "Challenges",
        summary: "The hardest work was making asynchronous and multi-tenant state legible to the operator without weakening financial or access guarantees.",
        challenges: [
          { number: "01", title: "A settled invoice with a failed customer badge", problem: "Payment succeeded, but different collection paths could leave stale failed/overdue status and keep the customer in a recovery queue.", options: [{ label: "Patch each screen separately", verdict: "Rejected", reason: "The same defect could return through a webhook, manual payment, retry, card-on-file charge, or account credit." }, { label: "Centralize the transition rule", verdict: "Chosen", reason: "One resolver applies the same settlement condition across the paths that can clear financial failure." }], decision: "Resolve status only when settlement is complete and remaining open invoices are considered; preserve pause, suspension, and cancellation as separate lifecycle states.", tradeoff: "A shared helper adds a dependency across payment handlers and needs careful partial-payment handling.", impact: "The status shown in billing and collections can recover when the underlying money state actually recovers." },
          { number: "02", title: "Correctness under parallel reads", problem: "Two screens could both auto-create the same business record after reading that it did not yet exist.", decision: "Make record identity deterministic and let a unique constraint plus conflict-safe upsert define the single winner.", tradeoff: "A database migration and stable dedupe-key contract are required; callers must reread after a conflict.", impact: "Concurrent access and retries converge instead of producing duplicate invoices or work orders." },
          { number: "03", title: "One customer's pools are not one billing account", problem: "Customer-level settings made it easy to pause or price all properties when the operator intended to act on just one.", decision: "Carry property_id through pause and billing operations, then aggregate only at the customer summary layer.", tradeoff: "More scope-aware reads and controls; operators need to choose the exact pool when acting.", impact: "Independent properties can continue or pause service without changing sibling properties' billing." },
          { number: "04", title: "Global role versus least privilege", problem: "An admin role without a tenant match can target another company’s technician; a broad table policy can reveal admin state to technicians.", decision: "Add caller-to-target tenant checks and tighten RLS permissions by operation and role.", tradeoff: "The same access decision needs both correct server policy and tests for legitimate and foreign-tenant cases.", impact: "Unauthorized cross-tenant edits and reads are blocked at the boundary, not hidden by presentation." },
        ], layout: ["challenges"]
      },
      {
        number: "07", title: "Results & business impact", navTitle: "Results",
        summary: "The work made high-risk operator states more coherent across billing, tenant access, and field operations.",
        paragraphs: [
          "The specific delivered changes include property-scoped billing pauses, shared payment-state recovery, refund entries in invoice payment history, duplicate guards for auto-created invoices and work orders, tenant checks for technician-management actions, and least-privilege access for operational tables. Related fixes made paused accounts consistently ineligible for invoice/charge paths and kept certain service completion and billing events connected.",
          "For an operator, these details affect everyday decisions: whether a charge actually succeeded, whether a refund is visible, which pool is paused, whether a technician can see a record, and whether a repeated job creates new work. The repository and change history support these shipped capabilities; I do not have verified revenue, customer-count, support-volume, or time-saved metrics to claim."
        ],
        cards: [
          { label: "Money state", title: "Show the net story", body: "Payment and refund events are visible together, while failed/overdue status follows the resolved invoice state." },
          { label: "Operator control", title: "Act on one property at a time", body: "Multi-property customers keep property-specific service and billing decisions, with a customer-level summary for oversight." },
          { label: "Data boundary", title: "Keep tenant and role rules enforced", body: "Technician and operations access is checked against tenant ownership and permitted action, including beyond the visible UI." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "08", title: "What I would improve next", navTitle: "Next",
        summary: "After correcting state transitions, make it easier to see where a workflow is waiting and why.",
        paragraphs: [
          "I would add an operator-facing reconciliation view that joins invoice events, provider webhooks, retry attempts, refund totals, and the final customer/property state. That would turn ‘why is this still overdue?’ into a traceable answer rather than another support investigation.",
          "For field operations, I would make queued mobile writes and their replay results visible in a persistent sync surface, then instrument completion-to-invoice latency and duplicate-conflict counts. I would also keep a tenant/role test matrix around every new Edge Function and RLS policy so product expansion preserves the same boundary."
        ],
        callout: { label: "Signals I would track", text: "Payment-to-status reconciliation time · refunds with unresolved invoice state · duplicate-create conflicts · property-scope correction rate · offline work waiting to sync · cross-tenant authorization denials." },
        layout: ["paragraphs", "callout"]
      },
    ],
  },
  {
    slug: "govihari",
    company: "Govihari",
    role: "Full Stack Mobile Engineer · Contract",
    status: "Delivered · awaiting live release",
    title: "River-boat ticketing with calm boarding as the outcome",
    detailTitle: "Govihari — Protecting fixed-capacity boat bookings",
    excerpt: "A passenger booking is only complete when the boat has capacity, the payment is verified, the ticket is retrievable, and operators can see the same booking state.",
    meta: [
      { label: "Product", value: "River-boat reservations + operator dashboard" },
      { label: "Users", value: "Travelers · boat operators" },
      { label: "Commercial model", value: "Paid trips + selected add-ons" },
      { label: "Status", value: "Delivered · awaiting live release" },
    ],
    productLinks: [
      { label: "Watch product walkthrough", url: "https://www.youtube.com/watch?v=zl4e_pjz3S8&t=12s" },
    ],
    atAGlance: [
      { number: "01", title: "Let guests book without creating a full account." },
      { number: "02", title: "Recalculate price and capacity on the server." },
      { number: "03", title: "Treat Razorpay verification as the payment authority." },
      { number: "04", title: "Make ticket and cancellation states operationally visible." },
    ],
    sections: [
      {
        number: "01", title: "Product overview", navTitle: "Overview",
        summary: "A mobile-first boat reservation experience connected to an operator dashboard and booking backend.",
        paragraphs: [
          "Travelers browse boats and departure dates, select passenger counts and optional services, pay, and receive a ticket they can retrieve for boarding. Phone number and booking details support guest recovery. Operators manage boats, schedules, prices, bookings, meals, transportation add-ons, and revenue views from a web dashboard.",
          "The repository pairs a React Native app with an Express/MongoDB backend, Razorpay, a PDF ticket path, Firebase messaging, and RabbitMQ worker processing. My role was Full Stack Mobile Engineer on a contract project; I worked across the passenger experience and the backend workflows it depended on."
        ],
        cards: [
          { label: "Traveler", title: "Guest booking", body: "Choose a boat and date, enter guest details, select available add-ons, pay, and retrieve a ticket." },
          { label: "Operator", title: "Admin dashboard", body: "Manage boats, transport, meals, fares, schedules, bookings, cancellations, and revenue reporting." },
          { label: "Platform", title: "Booking services", body: "Express routes and MongoDB records connect capacity, Razorpay payment, background processing, ticket generation, and push." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "02", title: "The problem", navTitle: "The problem",
        summary: "Fixed boat capacity makes payment uncertainty a physical operations problem: the same passenger count cannot be promised twice.",
        paragraphs: [
          "Travelers need to understand the trip price before payment, including meals and transport options. Operators need capacity and bookings to agree with what passengers purchased. A payment can succeed even when the app loses its response, and a cancellation may need refund follow-up after the customer has left the checkout screen.",
          "Guest checkout reduces signup friction, but it also means the system must provide another dependable recovery path. The booking reference, phone number, payment state, ticket, and cancellation record need to remain connected."
        ],
        cards: [
          { title: "Capacity race", body: "Two requests can observe the same remaining seats before either creates a booking." },
          { title: "Money-state ambiguity", body: "A dropped app response cannot tell the operator whether Razorpay captured the payment." },
          { title: "Recovery without an account", body: "A guest still needs to find a ticket or understand a cancellation later." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "03", title: "Product decisions", navTitle: "Decisions",
        summary: "Keep guest access simple, but place price, payment, and capacity decisions on the server.",
        decisions: [
          { number: "01", title: "Guest checkout with a recovery key", problem: "A mandatory full account can add friction to an occasional trip purchase.", decision: "Allow guest booking and use phone number plus booking reference for later lookup.", tradeoff: "Recovery depends on the traveler retaining accurate booking details and phone access.", impact: "Passengers can complete the trip purchase without first creating a full profile." },
          { number: "02", title: "Use a temporary booking record, then confirm capacity", problem: "Available capacity can change while a traveler is completing checkout.", decision: "The repository creates temporary bookings with expiry and the worker conditionally decrements available seats inside a MongoDB transaction before finalizing queued booking work.", tradeoff: "There are separate hold and worker paths to reconcile; an availability read followed by a temporary insert is not itself an atomic lock.", impact: "The booking flow has a bounded hold and a database-side conditional capacity guard; race behavior still deserves explicit concurrency testing." },
          { number: "03", title: "Verify Razorpay on the backend", problem: "A success screen or client return can be replayed, forged, or interrupted.", decision: "Validate the payment signature, fetch provider payment/order status, and compare the server-side booking amount before confirmation.", tradeoff: "The app waits on a server/provider round trip rather than trusting local checkout state.", impact: "The payment record and ticket follow the provider-verified result." },
        ], layout: ["decisions"]
      },
      {
        number: "04", title: "System design", navTitle: "Architecture",
        summary: "The app and dashboard share an Express API; booking state flows through MongoDB, Razorpay, RabbitMQ workers, ticket generation, and Firebase push.",
        paragraphs: ["The asynchronous path separates booking and refund follow-up from the passenger’s immediate interaction. A booking worker processes queued work and performs the capacity update within a database session. PDFKit/Puppeteer and templates generate ticket artifacts; Firebase messaging delivers device notifications."],
        cards: [
          { label: "Clients", title: "React Native + React dashboard", body: "The mobile experience drives trip selection, add-ons, checkout, ticket, and booking lookup; the dashboard owns boat, fare, schedule, and booking operations." },
          { label: "Backend", title: "Express + MongoDB", body: "Booking, guest recovery, capacity, payment, cancellation, and reporting records." },
          { label: "Integrations", title: "Razorpay · RabbitMQ · Firebase", body: "Provider verification, queued booking/refund processing, PDF ticket delivery, and push notifications." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "05", title: "Key product flows", navTitle: "Journeys",
        summary: "The system joins passenger choices to capacity and revenue records instead of stopping at checkout success.",
        flows: [
          { id: "A", title: "Trip → payment → ticket", summary: "A purchase becomes a boat manifest entry and retrievable ticket.", steps: ["App loads boats and departures", "Traveler selects date, passenger count, and extras", "Server recalculates the amount and begins booking/payment work", "Razorpay signature and provider status are verified", "Worker confirms available capacity and booking state", "Ticket is generated and returned for boarding"], body: "The phone can update its displayed total as options change, while the server recomputes the final amount before payment. The booking record remains the source of truth after the app returns from checkout.", callout: "When provider state is uncertain, do not infer failure from the missing app response; reconcile payment before releasing the booking." },
          { id: "B", title: "Guest recovery", summary: "A traveler can return to a booking without creating a profile first.", steps: ["Traveler enters phone or booking reference", "API finds the matching booking", "App retrieves ticket and current status", "Operator dashboard sees the same booking record"], body: "This keeps low-friction purchase compatible with later access to ticket and cancellation information." },
          { id: "C", title: "Cancellation → refund follow-up", summary: "A cancellation records business state and leaves asynchronous work visible.", steps: ["Customer or operator requests cancellation", "Backend applies time-to-departure policy", "Booking state and payment record are updated", "Retryable refund work is sent to the queue", "Operator can inspect the resulting booking state"], body: "The repository includes retry and worker paths for payment reversal; a refund request is not represented as settled until the provider outcome is known." },
        ], layout: ["flows"]
      },
      {
        number: "06", title: "Engineering challenges & trade-offs", navTitle: "Challenges",
        summary: "The useful distinction is between what the app can preview and what the backend can guarantee.",
        challenges: [
          { number: "01", title: "A temporary hold is not an atomic lock", problem: "The seat service reads aggregate availability and then writes a temporary booking; another request can race between those operations.", decision: "Use an expiring pending record for the checkout window and a conditional capacity decrement inside the worker transaction as the final guard.", tradeoff: "The system has two related inventory mechanisms that must stay reconciled, and expiry behavior needs monitoring.", impact: "The worker does not decrement a boat whose availableSeats counter is already zero; the remaining improvement is to make initial holds atomic as well." },
          { number: "02", title: "Payment can outlive the client session", problem: "Razorpay may settle after the app disconnects or returns late.", decision: "Verify provider signature and fetch server-side payment/order state before treating the booking as paid.", tradeoff: "The customer may see a pending state while the server resolves the provider outcome.", impact: "A lost redirect is not mistaken for a failed charge or a confirmed ticket." },
          { number: "03", title: "Add-ons must price the same way twice", problem: "Client totals and server totals can diverge as meals or transport options change.", decision: "Show immediate client-side totals for responsiveness, then recalculate the final amount server-side.", tradeoff: "The server can reject a stale or mismatched amount at checkout.", impact: "The charged amount is grounded in backend pricing rather than trusting a client-submitted total." },
        ], layout: ["challenges"]
      },
      {
        number: "07", title: "Results & business impact", navTitle: "Results",
        summary: "The delivered project links guest purchase, fixed capacity, payment verification, ticket generation, cancellation, and operator reporting.",
        paragraphs: ["Govihari was delivered with a passenger booking app, an admin dashboard, and backend flows for boats, add-ons, payment, booking lookup, tickets, push, and cancellation. The system creates a path from trip discovery to an operator-visible booking. I do not have verified volume, revenue, or conversion numbers to report."],
        cards: [
          { title: "For travelers", body: "Guest booking with add-ons, Razorpay checkout, booking recovery, and ticket access." },
          { title: "For operators", body: "Boat, schedule, fare, booking, cancellation, and revenue workflows in one dashboard." },
          { title: "For the product", body: "A defined server-side payment and capacity path with asynchronous processing and notification integrations." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "08", title: "What I would improve next", navTitle: "Next",
        summary: "Close the hold race and make payment/refund uncertainty measurable for the operator.",
        paragraphs: ["I would replace the read-then-create temporary hold with one atomic conditional reservation, then make expiry cleanup and worker retries observable. I would add reconciliation for the temporary booking and availableSeats counter, and show operators a clear pending-refund queue with provider status and age."],
        callout: { label: "Next success measures", text: "Hold conflicts by departure · expired holds reclaimed · payment-to-ticket time · refund completion age." },
        layout: ["paragraphs", "callout"]
      },
    ],
  },
  {
    slug: "legato",
    company: "Legato Networks",
    role: "Full Stack Developer · Full-time",
    period: "Jul 2025 — Mar 2026",
    status: "Live",
    title: "Helping musicians find the right people nearby",
    detailTitle: "Legato — Turning musician discovery into collaboration",
    excerpt: "A musician network needs more than profiles. Discovery, location, skills, social boundaries, messaging, and safety have to work together before a useful collaboration can begin.",
    meta: [
      { label: "Product", value: "Musician discovery + collaboration network" },
      { label: "Users", value: "Musicians building local and remote connections" },
      { label: "Commercial model", value: "Not verified in repository" },
      { label: "Status", value: "Live" },
    ],
    productLinks: [
      { label: "iOS app · App Store", url: "https://apps.apple.com/us/app/legato-networks/id6670702062" },
      { label: "Android app · Google Play", url: "https://play.google.com/store/apps/details?id=com.legato&hl=en-US" },
    ],
    atAGlance: [
      { number: "01", title: "Make skills, intent, and distance useful discovery signals." },
      { number: "02", title: "Keep identity and artist profile connected." },
      { number: "03", title: "Treat follow, block, report, and moderation as product features." },
      { number: "04", title: "Use dedicated chat infrastructure for real-time conversations." },
    ],
    sections: [
      {
        number: "01", title: "Product overview", navTitle: "Overview",
        summary: "Legato helps musicians present their work, discover collaborators, build relationships, and start conversations.",
        paragraphs: [
          "The mobile product combines musician profiles, instruments and skills, location, musical interests, open-to-collaborate intent, search, follows, circles/groups, chat, and notifications. A musician needs to be discoverable for the right reason and then be able to decide whether to connect.",
          "The architecture uses a React Native app, Express API, Better Auth, PostgreSQL with geospatial queries, S3/MinIO media storage, Stream Chat, Firebase messaging, email delivery, moderation providers, and client/server observability. My role was Full Stack Developer on the Legato Networks team; I contributed across the application and its backend integrations."
        ],
        cards: [
          { label: "Discovery", title: "Profiles with context", body: "Skills, instruments, musical styles, location, and collaboration intent help people find relevant musicians." },
          { label: "Connection", title: "Social graph + chat", body: "Follow, groups/circles, conversations, notifications, and relationship controls carry discovery into interaction." },
          { label: "Trust", title: "Safety + identity", body: "Authentication, block/report flows, and configurable content moderation support safer participation." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "02", title: "The problem", navTitle: "The problem",
        summary: "A directory can show musicians; a collaboration product must help the right people find each other and contact each other safely.",
        paragraphs: [
          "A name-only search does not answer whether someone plays the needed instrument, shares a musical style, is open to collaboration, or is close enough to work together. Broad location filters also become less useful as the number of profiles grows.",
          "Once someone is discovered, profile setup, connection state, chat identity, notification routing, and safety actions cannot drift apart. A user blocked in one surface should not remain reachable through another interaction path."
        ],
        cards: [
          { title: "Relevance", body: "Name search alone is weak for a skills-, intent-, and location-driven collaboration decision." },
          { title: "Relationship state", body: "Follow, groups, blocks, reports, and chat access need consistent identity and server-side rules." },
          { title: "Safety at scale", body: "User-generated profiles and messages need reporting and moderation paths that are part of normal product operations." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "03", title: "Product decisions", navTitle: "Decisions",
        summary: "Optimize discovery for collaboration context, while keeping identity, relationship rules, and messaging responsibilities explicit.",
        decisions: [
          { number: "01", title: "Search by collaboration context", problem: "A musician needs more than a list of names to decide whom to contact.", decision: "Combine skill/intent filters with PostGIS distance queries and distance-based ordering when coordinates are present.", tradeoff: "More query complexity and the need for useful profile data; geographic relevance cannot replace human judgment.", impact: "Search results can express why a person is relevant and nearby rather than treating every profile as equivalent." },
          { number: "02", title: "Link auth identity to the artist profile", problem: "Signup can create an authenticated account that still lacks the profile data discovery depends on.", decision: "Use Better Auth with a linked application profile in PostgreSQL and a staged onboarding path.", tradeoff: "Onboarding has more steps than a minimal email-only account.", impact: "Identity and the musician’s discoverable profile can evolve without collapsing into one overloaded record." },
          { number: "03", title: "Delegate real-time chat to a chat platform", problem: "Building message delivery, channels, membership, and real-time synchronization inside the core API would expand its operational scope.", decision: "Use Stream Chat for conversations and provision users/access tokens through the backend.", tradeoff: "The product depends on a provider and must keep provider identity and app identity synchronized.", impact: "The core API owns authorization and user context while the chat provider handles real-time messaging." },
        ], layout: ["decisions"]
      },
      {
        number: "04", title: "System design", navTitle: "Architecture",
        summary: "The mobile client calls a layered API; PostgreSQL/PostGIS owns profiles and relationships, while specialist providers handle media, chat, messaging, and moderation.",
        paragraphs: ["Search requests are shaped by API rules before the database applies indexed profile and distance queries. Better Auth handles identity, Sequelize connects profile data to PostgreSQL, and S3/MinIO stores media outside relational records. Stream Chat and Firebase cover real-time conversations and push; Resend handles email. The mobile client also integrates PostHog and Sentry, with Prometheus-based backend monitoring in the repository architecture."],
        cards: [
          { label: "Core data", title: "PostgreSQL + PostGIS", body: "Normalized profiles, skills, follows, groups, reports, and geographic filtering." },
          { label: "Product services", title: "Express + Better Auth", body: "Search, profile, social graph, moderation decisions, chat provisioning, and notification orchestration." },
          { label: "External boundaries", title: "S3/MinIO · Stream · Firebase · Resend", body: "Media, real-time chat, push delivery, and transactional email are separate integrations." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "05", title: "Key product flows", navTitle: "Journeys",
        summary: "Discovery should lead to an informed and safe first interaction.",
        flows: [
          { id: "A", title: "Onboarding → discoverable profile", summary: "Turn identity into a useful musician profile.", steps: ["Create account through Better Auth", "Complete musician and location details", "Attach instruments, skills, styles, and intent", "Store profile/media in the appropriate data boundary", "Become searchable through profile and geo filters"], body: "Identity, profile, and media are handled in separate components so profile changes do not become authentication changes." },
          { id: "B", title: "Search → conversation", summary: "Move from relevant result to real collaboration contact.", steps: ["Set skill, intent, and distance criteria", "API builds a paginated query", "PostGIS filters and orders nearby profiles", "User opens a profile and follows or connects", "Backend provisions chat identity and access", "Stream Chat delivers the conversation"], body: "The discovery result is a product decision surface: relevance signals should help a musician choose who to approach." },
          { id: "C", title: "Report or block → safer network", summary: "A user can act when an interaction is unwanted or content is harmful.", steps: ["User reports, blocks, or changes relationship state", "API validates the actor and target", "Relationship/report state is persisted", "Moderation provider can review submitted content", "Notifications and access respect the updated relationship"], body: "Basic, OpenAI, and Perspective moderation providers are represented in the code; the provider can be configured rather than hard-coding every policy to one vendor." },
        ], layout: ["flows"]
      },
      {
        number: "06", title: "Engineering challenges & trade-offs", navTitle: "Challenges",
        summary: "Discovery quality and social safety depend on data model and policy choices, not just screen layout.",
        challenges: [
          { number: "01", title: "Geospatial relevance without a separate search cluster", problem: "Nearby musicians must be filtered and ordered alongside profile and skill criteria.", decision: "Use PostGIS geography operations with PostgreSQL/Sequelize, including distance and pagination in the database query.", tradeoff: "Geospatial queries require careful indexing, coordinate validation, and attention to query cost.", impact: "Distance participates in the actual search results rather than being a decorative map attribute." },
          { number: "02", title: "Safety rules across social actions", problem: "Blocking, reporting, follows, and chat can become inconsistent if each path applies its own policy.", decision: "Keep relationship and moderation routes in the API, and provision chat access through server-generated identity/token flows.", tradeoff: "The backend must coordinate app state with a provider-managed chat graph.", impact: "The product retains a central place to enforce access and record user reports." },
          { number: "03", title: "Specialist providers vs owning every capability", problem: "Media, chat, push, email, and moderation each have different scaling and reliability needs.", decision: "Use dedicated services behind application-level modules and keep profile/relationship data in PostgreSQL.", tradeoff: "Provider outages, cost, and data synchronization become explicit operational concerns.", impact: "The core product API stays focused on musician identity, discovery, and relationship rules." },
        ], layout: ["challenges"]
      },
      {
        number: "07", title: "Results & business impact", navTitle: "Results",
        summary: "The live product provides a connected path from musician profile to discovery, relationship, and conversation.",
        paragraphs: ["The shipped capability spans onboarding, location-aware discovery, skill/profile data, follow and block/report behavior, groups, chat, push, and content moderation integrations. That is a stronger product surface than a profile directory: the user can find a relevant person and take the next action. The repository does not provide verified user counts, collaboration outcomes, or revenue figures, so I do not claim those metrics."],
        cards: [
          { title: "For musicians", body: "Present musical context and discover people by skills, intent, and distance." },
          { title: "For the product", body: "Keep authentication, profile data, social relationships, and chat identity connected." },
          { title: "For operations", body: "Use reporting, configurable moderation providers, push/email, and client/backend observability." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "08", title: "What I would improve next", navTitle: "Next",
        summary: "Measure whether discovery creates useful connections, not only whether search returns results.",
        paragraphs: ["I would instrument the funnel from search impression to profile open, follow, first message, and sustained collaboration, then use that evidence to tune relevance. I would also review location precision and consent, moderation escalation times, block/report enforcement across chat, and provider-failure recovery."],
        callout: { label: "Next success measures", text: "Relevant profile opens · first-message rate · response rate · report resolution time · search latency by filter." },
        layout: ["paragraphs", "callout"]
      },
    ],
  },
  {
    slug: "srkan",
    company: "SRKAN",
    role: "Mobile + backend engineering contributor",
    status: "Live",
    title: "A devotional experience designed for interrupted connectivity",
    detailTitle: "SRKAN — Keep daily practice available offline",
    excerpt: "Reading, listening, live programming, local reminders, and donations are different journeys. The product connects them while preserving the content people already downloaded and the proof donors need to follow a transfer.",
    meta: [
      { label: "Product", value: "Devotional content + community platform" },
      { label: "Users", value: "Sangat · donors · branch administrators" },
      { label: "Funding", value: "PayU + SWIFT/manual donations" },
      { label: "Status", value: "Live" },
    ],
    productLinks: [
      { label: "iOS app · App Store", url: "https://apps.apple.com/us/app/sarab-rog-ka-aukhad-nam/id1202661629" },
      { label: "Android app · Google Play", url: "https://play.google.com/store/apps/details?id=com.akal.srkan&hl=en-US" },
    ],
    atAGlance: [
      { number: "01", title: "Make downloaded scripture and audio useful offline." },
      { number: "02", title: "Keep local reminders on the device." },
      { number: "03", title: "Connect donation, receipt, review, and confirmation." },
      { number: "04", title: "Let administrators publish content through a shared API." },
    ],
    sections: [
      {
        number: "01", title: "Product overview", navTitle: "Overview",
        summary: "A mobile devotional product for daily content, audio practice, live programming, schedules, and giving.",
        paragraphs: [
          "The mobile app brings together home content, Shabad Jaap, media, live radio, samagams, schedules, and local notifications. A listener may have an intermittent connection, so playback, downloaded assets, and local progress should remain useful when the network is unavailable.",
          "A Next.js admin dashboard and Express API let administrators manage branches, daily schedules, programs, site content, streams, testimonials, and donations. Funding includes PayU as well as SWIFT/manual transfer paths with receipt upload and review. My contribution was across mobile and backend product work with the SRKAN team."
        ],
        cards: [
          { label: "Listener", title: "Mobile app", body: "Daily schedules, devotional content, Shabad Jaap, media, radio, and reminders." },
          { label: "Administrator", title: "Content dashboard", body: "Manage branches, programs, schedules, streams, testimonials, site content, and donation records." },
          { label: "Platform", title: "API + PostgreSQL", body: "Public/admin APIs connect content publishing, donation state, receipt upload, and email delivery." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "02", title: "The problem", navTitle: "The problem",
        summary: "A daily practice product must remain dependable when the listener’s connection is not.",
        paragraphs: [
          "A devotional session may depend on schedules, audio, and a saved playback position. If every screen requires a fresh network request, a tunnel or weak connection breaks the core habit. Reminders also need to fire at the right local time without a server being awake at that moment.",
          "Giving has a different trust problem. PayU can report success or failure, while a bank transfer needs a donor to upload evidence and an administrator to verify it. The product has to preserve that difference instead of showing every initiated donation as received."
        ],
        cards: [
          { title: "Interrupted network", body: "Previously fetched content and playback position should still be available locally." },
          { title: "Reminder reliability", body: "Local devotional reminders should not depend on a server push being delivered at the exact time." },
          { title: "Donation proof", body: "Electronic provider callbacks and manually reviewed transfer receipts require different state transitions." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "03", title: "Product decisions", navTitle: "Decisions",
        summary: "Treat offline reading/listening and donation confirmation as first-class product flows, not edge cases.",
        decisions: [
          { number: "01", title: "Cache devotional data on device", problem: "A network interruption should not erase reading, listening, or the listener’s place in a session.", decision: "Use Expo SQLite/local storage for scripture and audio data, preferences, and playback position; use API data to refresh what can be updated.", tradeoff: "The app must reconcile downloaded content, current schedules, and local progress when connectivity returns.", impact: "Core devotional material can remain available offline instead of failing with the request." },
          { number: "02", title: "Schedule reminders locally", problem: "A remote notification depends on server timing, device connectivity, and push delivery at the moment of the reminder.", decision: "Schedule devotional reminders on the device from the app’s schedule/content data.", tradeoff: "Timezone, permission, and schedule changes must be handled on the client.", impact: "A reminder can fire locally without requiring a backend job at that instant." },
          { number: "03", title: "Keep donation proof distinct from money state", problem: "A transfer receipt is evidence submitted by a donor, not proof that the organization has verified the funds.", decision: "Use PayU callbacks for provider outcomes and a separate SWIFT/manual receipt upload plus administrator review path.", tradeoff: "Manual transfer confirmation is slower and requires an operations step.", impact: "Donors and administrators can see the difference between initiated, evidenced, and reviewed giving." },
        ], layout: ["decisions"]
      },
      {
        number: "04", title: "System design", navTitle: "Architecture",
        summary: "Mobile and admin clients use the same Express API; PostgreSQL stores published and donation state, while the device owns offline content and reminders.",
        paragraphs: ["The app uses Expo, SQLite, local file storage, and device notification scheduling. The Next.js dashboard manages public and administrative content through separate route groups. Express services persist branches, schedules, programs, streams, testimonials, and donation state in PostgreSQL; Multer stores compressed uploads on the server and email informs donors/admins about transfer instructions and receipts."],
        cards: [
          { label: "Client state", title: "Expo + SQLite + device services", body: "Offline scripture/audio data, playback progress, cached media, and local reminders." },
          { label: "Operations", title: "Next.js admin + Express API", body: "Public content reads and authenticated content/donation changes share a clear API boundary." },
          { label: "Trust boundary", title: "PostgreSQL + PayU + receipt review", body: "Donation records persist provider, transfer, receipt, and administrator-review state." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "05", title: "Key product flows", navTitle: "Journeys",
        summary: "The system connects daily use to the right source of truth: device storage for offline practice and backend state for giving.",
        flows: [
          { id: "A", title: "Content publish → offline practice", summary: "Administrator updates flow into a listener’s local library.", steps: ["Admin edits branch, schedule, program, or stream", "API validates and persists published content", "App fetches and caches available content", "Listener opens scripture or audio from local storage", "Playback position and preferences remain on device", "The app refreshes when connectivity returns"], body: "The server remains the publishing source, while local storage protects the reading/listening session from a temporary connection loss." },
          { id: "B", title: "Donation → confirmation", summary: "Provider payment and manual transfer follow separate proof paths.", steps: ["Donor selects amount and payment method", "PayU path creates a payment handoff, or transfer path creates instructions", "PayU callback updates donation result", "For transfer, donor uploads a receipt", "Admin reviews evidence and updates donation", "Email sends donor/admin confirmation"], body: "A receipt upload is not treated as verified funds. The administrator review step is part of the product workflow for manual transfers.", callout: "Keep pending transfer evidence distinct from a completed provider payment." },
          { id: "C", title: "Daily reminder → local notification", summary: "The app schedules the prompt on the device.", steps: ["App reads schedule and user preferences", "Notification scheduler computes upcoming occurrences", "Expo schedules local notifications", "Device presents the reminder at the chosen time"], body: "This path does not require an always-on server to send the reminder." },
        ], layout: ["flows"]
      },
      {
        number: "06", title: "Engineering challenges & trade-offs", navTitle: "Challenges",
        summary: "Offline-first behavior improves continuity but makes cache ownership and refresh policy explicit responsibilities.",
        challenges: [
          { number: "01", title: "Offline availability vs freshness", problem: "Downloaded material stays accessible, but schedule and published content can change.", decision: "Keep a local content/audio path and refresh server-managed content when connectivity is available.", tradeoff: "The interface needs to distinguish saved material from newly published updates.", impact: "Weak connectivity no longer blocks the complete reading/listening experience." },
          { number: "02", title: "Device reminders vs server push", problem: "A local routine should fire even when the network is unavailable.", decision: "Use on-device scheduling for devotional reminders and reserve the API for the underlying schedules/content.", tradeoff: "The app must reschedule after preference, timezone, or schedule changes and handle permission denial.", impact: "Reminder delivery is not coupled to server uptime at the moment it fires." },
          { number: "03", title: "Provider result vs human-verified transfer", problem: "A manual bank transfer cannot be confirmed by the same callback used for an online payment.", decision: "Persist receipt upload and administrator review as distinct donation states, with email on the handoff.", tradeoff: "Manual transfers take an operational step and may remain pending longer.", impact: "The product avoids presenting donor-submitted evidence as settled funds." },
        ], layout: ["challenges"]
      },
      {
        number: "07", title: "Results & business impact", navTitle: "Results",
        summary: "The live product supports offline devotional sessions, locally scheduled reminders, administrator-managed content, and multiple donation paths.",
        paragraphs: ["The system connects mobile listening/reading with content operations and donation review. The user experience can continue from cached material; an administrator can update schedules and streams; donors can pay through PayU or submit evidence for a transfer. These are repository-backed capabilities. I do not have verified engagement, donation, or retention metrics to claim."],
        cards: [
          { title: "For listeners", body: "Access cached content, audio, saved progress, and local reminders." },
          { title: "For administrators", body: "Publish schedules, programs, branch details, streams, and donation updates." },
          { title: "For donors", body: "Follow payment or transfer instructions and receive confirmation after the appropriate state transition." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "08", title: "What I would improve next", navTitle: "Next",
        summary: "Make offline freshness, playback reliability, and donation review measurable and transparent.",
        paragraphs: ["I would add cache versioning and an explicit last-synced state, then measure offline playback success and resume accuracy. On giving, I would add an operator queue for receipts with age, reviewer, and resolution reason, plus reconciliation for provider callbacks and donor email delivery."],
        callout: { label: "Next success measures", text: "Offline session completion · audio resume success · reminder scheduling accuracy · receipt review age · donation reconciliation gaps." },
        layout: ["paragraphs", "callout"]
      },
    ],
  },
  {
    slug: "kavoogo",
    company: "KavooGO",
    role: "Product engineering contributor · Ongoing",
    status: "Ongoing",
    title: "Campaign rewards connected to everyday mobility",
    detailTitle: "KavooGO — Connecting activity, rewards, and wallet state",
    excerpt: "KavooGO’s current repository centers on campaigns, surveys/videos, partner operations, and reward payouts. The broader brief adds rides and Colis delivery; the case study keeps those future product paths separate from what the repository implements today.",
    meta: [
      { label: "Product", value: "Campaign activity + rewards platform" },
      { label: "Users", value: "Participants · partners · operations team" },
      { label: "Funding", value: "Partner campaign budgets + wallet payouts" },
      { label: "Status", value: "Ongoing · scope still evolving" },
    ],
    availabilityNote: "Ongoing project · no public product walkthrough",
    atAGlance: [
      { number: "01", title: "Separate implemented reward flows from the wider brief." },
      { number: "02", title: "Connect survey completion to eligibility and wallet credit." },
      { number: "03", title: "Protect campaign budgets and payout state." },
      { number: "04", title: "Make partner operations part of the product architecture." },
    ],
    scopeNote: "Repository implementation: campaign creation/targeting, participant activities, survey callbacks, rewards, partner/admin tools, and PayDunya wallet/payout flows. The broader product brief includes ride booking, Colis pickup/delivery, and MTN MoMo; those are shown only in the Full product brief map mode and are not presented as shipped repository functionality.",
    sections: [
      {
        number: "01", title: "Product overview", navTitle: "Overview",
        summary: "A partner-funded activity platform where participants complete campaigns and receive rewards into a wallet.",
        paragraphs: [
          "The current mobile app supports onboarding, campaign/activity discovery, video and survey activities, history, notifications, rewards, and mobile-money withdrawal. Partners and administrators use a web dashboard to manage campaigns, targeting, budgets, users, transactions, providers, and analytics.",
          "The backend connects campaign eligibility, survey submissions/webhooks, reward ledgers, partner/admin payments, notifications, exchange-rate lookup, Cloudinary campaign media, and PayDunya. The product is ongoing. I am treating the repository as the implementation record and the supplied full product brief as the future-scope record."
        ],
        cards: [
          { label: "Participant", title: "Activity → reward", body: "Complete an eligible survey or video activity, see its status, and track earned rewards." },
          { label: "Partner", title: "Campaign operations", body: "Create targeted campaigns, budgets, activity content, and partner payment records." },
          { label: "Operations", title: "Admin + finance", body: "Manage users, campaigns, wallet funding, payout providers, transactions, and analytics." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "02", title: "The problem", navTitle: "The problem",
        summary: "A completed activity is not yet a trustworthy reward: the product has to know who completed what, whether it qualifies, and whether budget remains.",
        paragraphs: [
          "Participants need a clear path from campaign discovery to completion and payout. Partners need a way to target an audience, fund a campaign, and see spend. The platform needs to prevent duplicate completions or duplicate reward credits when an embedded survey reports completion more than once.",
          "Money also crosses different states: partner funding, campaign budget allocation, participant reward, admin wallet, and mobile-money disbursement. A single balance number would hide where funds are reserved, earned, or still awaiting provider confirmation."
        ],
        cards: [
          { title: "Eligibility", body: "Campaign filters and activity limits must be checked against participant state." },
          { title: "Duplicate callbacks", body: "A survey provider can retry a completion webhook; the reward should not be credited twice." },
          { title: "Budget and payout", body: "Campaign allocation and mobile-money settlement have separate owners and lifecycles." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "03", title: "Product decisions", navTitle: "Decisions",
        summary: "Make eligibility and budget rules server-owned, and give campaign operations a first-class partner/admin interface.",
        decisions: [
          { number: "01", title: "Treat completion as a verified state transition", problem: "A client can close a WebView or repeat a submission without proving a valid, unique activity completion.", decision: "Record survey completion, respondent/webhook identifiers, campaign/user association, and reward status; use database uniqueness and transaction logic in reward granting.", tradeoff: "Provider callback and participant-submission paths need reconciliation so the same completion is not represented twice.", impact: "A completion can be traced to a campaign and reward transaction, and budget/user balance changes are handled in a transaction." },
          { number: "02", title: "Separate campaign budget from user reward", problem: "Partner funds, allocated budget, and participant rewards are not the same balance.", decision: "Track campaign allocation and use transactional campaign budget updates plus a reward transaction when granting value.", tradeoff: "The finance model has more states and requires admin visibility into reservations and settlement.", impact: "The system can stop grants when budget is exhausted and preserve a transaction record for the participant." },
          { number: "03", title: "Keep broader mobility scope explicit", problem: "The product brief combines campaigns with rides and Colis delivery, but those journeys are not all implemented in the repository.", decision: "Show campaign/reward/payout as implementation and ride/Colis/MTN MoMo as full-brief scope.", tradeoff: "The case study communicates a product direction without implying every service is already shipped.", impact: "Founders can evaluate both the current system and the intended product boundary accurately." },
        ], layout: ["decisions"]
      },
      {
        number: "04", title: "System design", navTitle: "Architecture",
        summary: "The app and partner/admin dashboard call an Express API backed by PostgreSQL; external callbacks and providers update campaign, reward, and payout state.",
        paragraphs: ["Tripetto (survey), PayDunya (wallet funding/disbursement), Cloudinary (campaign media), and Moneyconvert (USD/XOF rates) sit at explicit integration boundaries. Socket.IO gives the mobile app immediate survey-completion feedback; durable campaign, survey, transaction, and reward state remains in PostgreSQL. A scheduler handles campaign auto-decline/expiry behavior."],
        cards: [
          { label: "Clients", title: "Mobile app + web operations", body: "Participants use activities and wallet screens; partners/admins manage campaigns, targeting, budgets, and transactions." },
          { label: "Core state", title: "Express + PostgreSQL", body: "User, partner, campaign, survey completion, transaction, notification, and wallet records." },
          { label: "Integrations", title: "Tripetto · PayDunya · Cloudinary", body: "Survey completion callbacks, payout/webhooks, and direct browser media uploads." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "05", title: "Key product flows", navTitle: "Journeys",
        summary: "A reward journey crosses the mobile app, activity provider, eligibility logic, budget ledger, notifications, and payout provider.",
        flows: [
          { id: "A", title: "Campaign → activity → reward", summary: "Completion becomes a budgeted reward transaction.", steps: ["Partner/admin creates a targeted campaign and budget", "Mobile app loads eligible activities", "Participant completes video or Tripetto survey", "API validates campaign/user state and records completion", "Reward service checks budget and activity limits", "User wallet and transaction record update", "Socket event/notification reflects the outcome"], body: "The provider callback path is separate from the immediate app state. The reward ledger and database transaction should remain authoritative when retries arrive.", callout: "The repository has survey completion identifiers and reward-grant safeguards; I would keep retry/reconciliation telemetry visible to operations." },
          { id: "B", title: "Partner funding → campaign allocation", summary: "Campaign operations depend on available platform funding.", steps: ["Partner funds campaign through the payment flow", "PayDunya callback updates payment state", "Backend normalizes XOF/USD using cached exchange rate", "Campaign service checks remaining wallet balance", "Admin sees budget and transaction state"], body: "Funding, allocation, and spend are distinct. Campaign creation checks the available platform balance and stores the planned budget." },
          { id: "C", title: "Reward → mobile-money payout", summary: "A withdrawal moves from an internal transaction to provider settlement.", steps: ["Participant requests a reward transfer", "Backend reserves/deducts wallet amount and creates transaction", "PayDunya disbursement is initiated", "Webhook maps provider result and deduplicates financial event", "Participant receives success/failure notification"], body: "The callback handler uses a database transaction and processed-webhook key for PayDunya financial events. That is different from claiming the provider has settled every request successfully." },
        ], layout: ["flows"]
      },
      {
        number: "06", title: "Engineering challenges & trade-offs", navTitle: "Challenges",
        summary: "The highest-risk boundary is the transition from external activity/payment events to internal money state.",
        challenges: [
          { number: "01", title: "Retry-safe reward granting", problem: "A webhook or client submission can be repeated, while reward balance and campaign budget must change together.", decision: "Use completion identifiers, database uniqueness, and a transactional reward grant that updates budget, user balance, and transaction record.", tradeoff: "Callback variants and race conditions still require operational monitoring and reconciliation; existence checks alone are not a substitute for database constraints.", impact: "The core reward grant has a durable transaction boundary and duplicate prevention at the data model." },
          { number: "02", title: "One product brief, two implementation states", problem: "The full vision includes rides, Colis, and MTN MoMo, while the current repository centers on campaigns and payout.", decision: "Separate implemented campaign/reward/payout flows from future ride and delivery domain integration.", tradeoff: "The product story must explain a roadmap without presenting planned capabilities as complete.", impact: "A founder can see the current platform core and the next integration seams clearly." },
          { number: "03", title: "Auto-decline and refunds", problem: "Campaigns may remain pending after a partner payment, and the participant/partner needs a clear final state.", decision: "The repository has an auto-decline scheduler, but its `refundPayment` routine is currently a placeholder that releases allocation and logs rather than calling a provider refund API.", tradeoff: "Campaign state can be updated without guaranteeing money has been returned externally.", impact: "Before describing this as an automatic refund, connect provider refund reconciliation and make the campaign state reflect confirmed settlement." },
        ], layout: ["challenges"]
      },
      {
        number: "07", title: "Results & business impact", navTitle: "Results",
        summary: "The ongoing implementation connects partner campaign management to participant activity, reward accounting, and payout workflows.",
        paragraphs: ["The repository provides the core activity economy: campaigns and targeting, participant survey/video journeys, completion records, budget-aware reward granting, partner/admin tooling, wallet transactions, and PayDunya payout callbacks. The broader ride/Colis product brief remains a separate future scope. No user, revenue, or payout-volume metrics were supplied, so I do not claim them."],
        cards: [
          { title: "Participant value", body: "Activities, history, rewards, notifications, and withdrawal entry points in one app." },
          { title: "Partner control", body: "Campaign targeting, creative assets, budget, and performance views through a web dashboard." },
          { title: "Platform integrity", body: "Campaign budgets and participant rewards have explicit records and transactional update paths." },
        ], layout: ["paragraphs", "cards"]
      },
      {
        number: "08", title: "What I would improve next", navTitle: "Next",
        summary: "Close the refund integration gap, then strengthen callback reconciliation and show campaign money states in one operational view.",
        paragraphs: ["I would implement real provider refund calls and reconciliation before presenting auto-decline as refunded. Next I would make survey completion processing fully atomic around completion creation and reward grant, add a replay/reconciliation queue for provider callbacks, and instrument budget exhaustion, duplicate callbacks, payout latency, and unresolved transactions. For the broader brief, I would define ride and Colis domain contracts before connecting wallet value to fares or delivery fees."],
        callout: { label: "Next success measures", text: "Eligible completion-to-reward rate · duplicate callback rate · budget reconciliation variance · payout settlement time · refund confirmation age." },
        layout: ["paragraphs", "callout"]
      },
    ],
  },
];

export default caseStudies;
