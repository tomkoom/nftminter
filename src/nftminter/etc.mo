import AssocList "mo:base/AssocList";
import List "mo:base/List";

actor {

  // whoami
  public shared query (msg) func whoami() : async Principal {
    msg.caller;
  };

  // –––

  var contacts : ContactsMap = List.nil();

  type Name = Text;
  type Phone = Nat;

  type Entry = {
    name : Name;
    address1 : Text;
    address2 : Text;
    email : Text;
    phone : Phone;
  };

  type ContactsMap = AssocList.AssocList<Name, Entry>;

  func nameEq(lhs : Name, rhs : Name) : Bool {
    return lhs == rhs;
  };

  public func insert(name : Name, address1 : Text, address2 : Text, email : Text, phone : Phone) : async () {
     let newEntry : Entry = {
       name;
       address1;
       address2;
       email;
       phone;
     };

     let (newContacts, _) = AssocList.replace(
       contacts,
       name,
       func(n: Name, m: Name) : Bool { n == m },
       ?newEntry
     );
     contacts := newContacts;
  };

  public query func lookup(name : Name) : async ?Entry {
    return AssocList.find(contacts, name, nameEq);
  };
};