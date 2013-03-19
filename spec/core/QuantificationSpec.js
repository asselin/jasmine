describe("jasmine.expectAll", function() {
  var env, spec;

  beforeEach(function() {
    env = new jasmine.Env();
    env.updateInterval = 0;

    var suite = env.describe("suite", function() {
      spec = env.it("spec", function() {
      });
    });
    spyOn(spec, 'addMatcherResult');

    this.addMatchers({
      toPass: function() {
        return lastResult().passed();
      },
      toFail: function() {
        return !lastResult().passed();
      }
    });
  });

  function matchAll(value) {
    return spec.expectAll(value);
  }

  function matchOneOf(value) {
    return spec.expectOneOf(value);
  }

  function lastResult() {
    return spec.addMatcherResult.mostRecentCall.args[0];
  }

  function catchException(fn) {
    try {
      fn.call();
    } catch (e) {
      return e;
    }
    throw new Error("expected function to throw an exception");
  }

  var numberArr = [ 1, 2, 3 ];
  var numberArr2 = [ 1, 1, 1 ];
  var stringArr = [ "Howdy", "Hidy-Ho", "How ya doin?" ];
  var obj1 = {
     a: 17
  };
  var obj2 = {
     a: 17
  };
  var objArr = [ obj1, obj1 ];
  var objArr2 = [ obj1, obj1, obj2 ];
  var nullArr = [ null, null, null ];
  var arrayWithNull = [ 1, "Howdy", null, obj1, obj2 ];

  it("should work correctly with core matchers", function() {
    expect(matchAll(numberArr2).toEqual(1)).toPass();
    expect(matchAll(numberArr2).toEqual(2)).toFail();
    expect(matchAll(objArr).toEqual(obj2)).toPass();
    expect(matchAll(objArr2).toEqual(obj2)).toPass();

    expect(matchAll(objArr).toBe(obj1)).toPass();
    expect(matchAll(objArr2).toBe(obj1)).toFail();

    expect(matchAll(stringArr).toMatch("H.*")).toPass();
    expect(matchAll(stringArr).toMatch("How.*")).toFail();

    expect(matchAll(stringArr).toBeDefined()).toPass();
    expect(matchAll(stringArr).toBeUndefined()).toFail();

    expect(matchAll(nullArr).toBeNull()).toPass();
    expect(matchAll(numberArr).toBeNull()).toFail();

    expect(matchAll(numberArr).toBeTruthy()).toPass();
    expect(matchAll(nullArr).toBeTruthy()).toFail();

    expect(matchAll(nullArr).toBeFalsy()).toPass();
    expect(matchAll(arrayWithNull).toBeFalsy()).toFail();

    expect(matchAll(stringArr).toContain("Ho")).toPass();
    expect(matchAll(stringArr).toContain("Ni Hao")).toFail();

    expect(matchAll(numberArr).toBeLessThan(5)).toPass();
    expect(matchAll(numberArr).toBeLessThan(2)).toFail();

    expect(matchAll(numberArr).toBeGreaterThan(0)).toPass();
    expect(matchAll(numberArr).toBeGreaterThan(1)).toFail();
  });

  it("should work correctly with Any", function() {
    expect(matchAll(numberArr).toEqual(jasmine.any(Number))).toPass();
  });

  it("should work correctly with ObjectContaining", function() {
    expect(matchAll(objArr2).toEqual(jasmine.objectContaining({a:17}))).toPass();
  });
});
